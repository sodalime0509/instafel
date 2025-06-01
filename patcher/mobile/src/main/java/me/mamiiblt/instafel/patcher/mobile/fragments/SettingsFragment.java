package me.mamiiblt.instafel.patcher.mobile.fragments;

import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.DialogFragment;
import androidx.preference.ListPreference;
import androidx.preference.Preference;
import androidx.preference.PreferenceFragmentCompat;
import androidx.preference.PreferenceManager;

import com.github.tttt55.materialyoupreferences.preferences.MaterialListPreference;
import com.github.tttt55.materialyoupreferences.preferences.MaterialPreference;
import com.github.tttt55.materialyoupreferences.preferences.MaterialSwitchGooglePreference;

import me.mamiiblt.instafel.patcher.mobile.BuildConfig;
import me.mamiiblt.instafel.patcher.mobile.R;
import me.mamiiblt.instafel.patcher.mobile.utils.Utils;

public class SettingsFragment extends PreferenceFragmentCompat {
    @Override
    public void onCreatePreferences(@Nullable Bundle savedInstanceState, @Nullable String rootKey) {
        setPreferencesFromResource(R.xml.app_options, rootKey);

        MaterialSwitchGooglePreference dynamicColorPreference = findPreference("material_you");
        if (dynamicColorPreference != null) {
            dynamicColorPreference.setOnPreferenceChangeListener((preference, newValue) -> {
                boolean isDynamicColorEnabled = (Boolean) newValue;

                SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(getActivity());
                sharedPreferences.edit().putBoolean("material_you", isDynamicColorEnabled).apply();

                getActivity().recreate();
                return true;
            });
        }

        MaterialPreference sourceCode = findPreference("source_code");
        sourceCode.setOnPreferenceClickListener(new Preference.OnPreferenceClickListener() {
            @Override
            public boolean onPreferenceClick(@NonNull Preference preference) {
                Intent intent = new Intent("android.intent.action.VIEW", Uri.parse("https://github.com/mamiiblt/instafel"));
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                getContext().startActivity(intent);
                return false;
            }
        });

        MaterialPreference createIssue = findPreference("create_issue");
        createIssue.setOnPreferenceClickListener(new Preference.OnPreferenceClickListener() {
            @Override
            public boolean onPreferenceClick(@NonNull Preference preference) {
                Intent intent = new Intent("android.intent.action.VIEW", Uri.parse("https://github.com/mamiiblt/instafel/issues"));
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                getContext().startActivity(intent);
                return false;
            }
        });

        MaterialPreference appVersion = findPreference("app_version");
        appVersion.setSummary("Version v" + BuildConfig.VERSION_NAME + " (" + BuildConfig.COMMIT + "@" + BuildConfig.BRANCH + ")");
        appVersion.setOnPreferenceClickListener(new Preference.OnPreferenceClickListener() {
            @Override
            public boolean onPreferenceClick(@NonNull Preference preference) {
                Utils.showAppInfoDialog(getActivity());
                return false;
            }
        });

        MaterialPreference aboutDecompiler = findPreference("about_decompiler");
        aboutDecompiler.setOnPreferenceClickListener(new Preference.OnPreferenceClickListener() {
            @Override
            public boolean onPreferenceClick(@NonNull Preference preference) {
                Utils.showDecompilerInfoDialog(getActivity());
                return false;
            }
        });

        int cpuCores = Math.min(Runtime.getRuntime().availableProcessors(), 32);
        CharSequence[] entries = new CharSequence[cpuCores];
        CharSequence[] entryValues = new CharSequence[cpuCores];

        for (int i = 0; i < cpuCores; i++) {
            int threadCount = i + 1;
            entries[i] = threadCount + (threadCount > 1 ? " threads" : " thread");
            entryValues[i] = String.valueOf(threadCount);
        }

        MaterialListPreference threadPref = findPreference("custom_thread_count");

        if (threadPref != null) {
            threadPref.setEntries(entries);
            threadPref.setEntryValues(entryValues);

            if (threadPref.getValue() == null) {
                int defaultThreads = Math.min(cpuCores, 2);
                threadPref.setValue(String.valueOf(defaultThreads));
            }
        }
    }

    @Override
    public void onDisplayPreferenceDialog(@NonNull Preference preference) {
        if (preference instanceof ListPreference) {
            showPreferenceDialog((ListPreference) preference);
        } else {
            super.onDisplayPreferenceDialog(preference);
        }
    }

    private void showPreferenceDialog(ListPreference preference) {
        DialogFragment dialogFragment = new me.mamiiblt.instafel.patcher.mobile.utils.MaterialListPreference();
        Bundle bundle = new Bundle(1);
        bundle.putString("key", preference.getKey());
        dialogFragment.setArguments(bundle);
        dialogFragment.setTargetFragment(this, 0);
        dialogFragment.show(getParentFragmentManager(), "androidx.preference.PreferenceFragment.DIALOG");
    }
}