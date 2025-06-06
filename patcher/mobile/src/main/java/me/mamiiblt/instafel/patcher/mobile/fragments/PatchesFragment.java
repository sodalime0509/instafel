package me.mamiiblt.instafel.patcher.mobile.fragments;

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
import androidx.preference.PreferenceFragmentCompat;
import androidx.preference.PreferenceScreen;

import com.github.tttt55.materialyoupreferences.preferences.MaterialPreference;

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
                        JSONObject patches = CoreHandler.getPatchesJSON();
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
            PreferenceScreen screen = getPreferenceScreen();
            Preference deneme = new Preference(getContext());
            deneme.setTitle(patchesData.toString(2));
            deneme.setSummary("naber fıstık");
            screen.addPreference(deneme);

        }
    }
}