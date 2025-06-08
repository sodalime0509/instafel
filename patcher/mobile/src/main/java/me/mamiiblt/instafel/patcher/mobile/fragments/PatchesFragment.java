package me.mamiiblt.instafel.patcher.mobile.fragments;

import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.ProgressBar;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.FragmentActivity;
import androidx.preference.Preference;
import androidx.preference.PreferenceCategory;
import androidx.preference.PreferenceFragmentCompat;
import androidx.preference.PreferenceGroup;
import androidx.preference.PreferenceScreen;
import androidx.recyclerview.widget.RecyclerView;

import com.github.tttt55.materialyoupreferences.preferences.MaterialPreference;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import me.mamiiblt.instafel.patcher.mobile.R;
import me.mamiiblt.instafel.patcher.mobile.handlers.CoreHandler;
import me.mamiiblt.instafel.patcher.mobile.utils.Utils;


public class PatchesFragment extends PreferenceFragmentCompat {

    @Override
    public void onCreatePreferences(@Nullable Bundle savedInstanceState, @Nullable String rootKey) {
    }

    @NonNull
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View root = inflater.inflate(R.layout.fragment_patches_host, container, false);
        return root;
    }

    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        getChildFragmentManager().beginTransaction()
                .replace(R.id.preference_container, new PatchesPreferenceFragment())
                .commit();
    }

    public static class PatchesPreferenceFragment extends PreferenceFragmentCompat {

        private View rootView;
        private ProgressBar loadingBar;
        private FrameLayout patchesLayout;

        @Override
        public void onCreatePreferences(@Nullable Bundle savedInstanceState, @Nullable String rootKey) {
            setPreferenceScreen(getPreferenceManager().createPreferenceScreen(requireContext()));
        }

        @Override
        public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
            super.onViewCreated(view, savedInstanceState);

            rootView = requireParentFragment().getView();
            loadingBar = rootView.findViewById(R.id.loading_spinner);
            patchesLayout = rootView.findViewById(R.id.preference_container);
            loadPatches();

            RecyclerView rv = getListView();
            while (rv.getItemDecorationCount() > 0) {
                rv.removeItemDecorationAt(0);
            }
        }

        private void loadPatches() {
            requireActivity().runOnUiThread(() -> {
                loadingBar.setVisibility(View.VISIBLE);
                patchesLayout.setVisibility(View.GONE);
            });

            new Thread(() -> {
                try {
                    FragmentActivity act = requireActivity();
                    if (CoreHandler.coreJarFile(act).exists()) {
                        CoreHandler.loadCoreSafely(act);
                        JSONObject patches = CoreHandler.getPatchesJSON(act);
                        Log.i("IPatcher", "patches loaded succesfully.");
                        requireActivity().runOnUiThread(() -> {
                            try {
                                buildPreferenceScreen(patches);
                            } catch (JSONException e) {
                                throw new RuntimeException(e);
                            }
                            loadingBar.setVisibility(View.GONE);
                            patchesLayout.setVisibility(View.VISIBLE);
                        });
                    } else {
                        showDialogOnUIThread("Error", "Core JAR not found, please download it from Core tab");
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    showDialogOnUIThread("Error", "An error occured while loading core or patches \n\n" + e.getMessage());
                }
            }).start();
        }

        private void showDialogOnUIThread(String title, String msg) {
            if (!isAdded()) return;

            requireActivity().runOnUiThread(() -> {
                if (!isAdded()) return;
                Utils.showDialog(requireActivity(), title, msg);
            });
        }

        private void buildPreferenceScreen(JSONObject patchesData) throws JSONException {
            Context context = getPreferenceManager().getContext();
            PreferenceScreen screen = getPreferenceManager().createPreferenceScreen(context);

            JSONArray singles = patchesData.getJSONArray("singles");
            JSONArray groups = patchesData.getJSONArray("groups");

            PreferenceCategory categorySingles = createPreferenceCategory("Single Patches", context);
            screen.addPreference(categorySingles);
            for (int i = 0; i < singles.length(); i++) {
                Preference pref = createPatchPreference(singles.getJSONObject(i), context);
                categorySingles.addPreference(pref);
            }

            for (int i = 0; i < groups.length(); i++) {
                JSONObject groupData = groups.getJSONObject(i);
                JSONArray groupPatches = groupData.getJSONArray("infos");
                PreferenceCategory groupCategory = createPreferenceCategory(groupData.getString("name"), context);
                screen.addPreference(groupCategory);

                for (int a = 0; a < groupPatches.length(); a++) {
                    groupCategory.addPreference(createPatchPreference(groupPatches.getJSONObject(a), context));
                }
            }

            setPreferenceScreen(screen);
        }

        private Preference createPatchPreference(JSONObject patchInfo, Context ctx) throws JSONException {
            Preference preference = new Preference(ctx);
            preference.setTitle(patchInfo.optString("name", "Unnamed"));
            preference.setSummary(patchInfo.optString("desc", ""));
            preference.setIconSpaceReserved(false);
            preference.setOnPreferenceClickListener(createPatchClickListener(patchInfo, ctx));
            return preference;
        }

        private Preference.OnPreferenceClickListener createPatchClickListener(JSONObject patchInfo, Context ctx) {
            return new Preference.OnPreferenceClickListener() {
                @Override
                public boolean onPreferenceClick(@NonNull Preference preference) {
                    try {
                        String className = patchInfo.getString("class");
                        String sCname = className.substring(className.indexOf(".core") + 1);
                        String[] message = {
                                "Name: " + patchInfo.getString("name"),
                                "Author: " + patchInfo.getString("author"),
                                "Shortname: " + patchInfo.getString("shortname"),
                                "Desc: " + patchInfo.getString("desc") + "\n",
                                "Loaded from " + sCname
                        };

                        new MaterialAlertDialogBuilder(ctx)
                                .setTitle(patchInfo.getString("name"))
                                .setMessage(String.join("\n", message))
                                .setNegativeButton("Visit Code", (dialog, which) -> Utils.openInBrowser(ctx, Uri.parse("https://github.com/mamiiblt/instafel/tree/main/patcher/core/src/main/java/" + className.replace(".", "/") + ".java")))
                                .setPositiveButton(android.R.string.yes, null)
                                .show();
                    } catch (JSONException e) {
                        throw new RuntimeException(e);
                    }
                    return false;
                }
            };
        }

        private PreferenceCategory createPreferenceCategory(String title, Context context) {
            PreferenceCategory preferenceCategory = new PreferenceCategory(context);
            preferenceCategory.setTitle(title);

            preferenceCategory.setIconSpaceReserved(false);
            return preferenceCategory;
        }

    }
}