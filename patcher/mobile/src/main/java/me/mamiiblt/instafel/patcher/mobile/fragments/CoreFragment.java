package me.mamiiblt.instafel.patcher.mobile.fragments;

import android.app.Activity;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.google.android.material.card.MaterialCardView;

import me.mamiiblt.instafel.patcher.mobile.R;
import me.mamiiblt.instafel.patcher.mobile.handlers.CoreHandler;
import me.mamiiblt.instafel.patcher.mobile.handlers.utils.ICoreRequest;
import me.mamiiblt.instafel.patcher.mobile.utils.UpdateInfo;
import me.mamiiblt.instafel.patcher.mobile.utils.Utils;

public class CoreFragment extends Fragment {

    private View loadingLayout;
    private LinearLayout prefContainer;
    private TextView statusText;
    private Activity act;
    private TextView commitText;
    private MaterialCardView checkUpdates, reinstallCore, reloadCore;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater,
                             @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_core_host, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        loadingLayout = view.findViewById(R.id.layout_loading);
        prefContainer = view.findViewById(R.id.layout_preference_container);
        statusText = view.findViewById(R.id.status_text);
        commitText = view.findViewById(R.id.commit_text);
        checkUpdates = view.findViewById(R.id.core_cfu);
        reloadCore = view.findViewById(R.id.core_reload_core);
        reinstallCore = view.findViewById(R.id.core_reinstall_core);
        act = getActivity();
        loadingLayout.setVisibility(View.VISIBLE);
        prefContainer.setVisibility(View.GONE);

        if (!CoreHandler.coreJarFile(act).exists()) {
            new Thread(() -> {
                CoreHandler.forceDownloadCore(requireActivity(), new ICoreRequest() {
                    @Override
                    public void onSuccess(UpdateInfo info) {
                        act.runOnUiThread(() -> showInfo());

                    }

                    @Override
                    public void onError(Exception e) {
                        e.printStackTrace();

                        requireActivity().runOnUiThread(() ->
                                statusText.setText("An error occured while downloading Core\n\n" + e.getMessage())
                        );
                    }
                });
            }).start();
        } else {
            showInfo();
        }
    }

    public void showInfo() {
        loadingLayout.setVisibility(View.GONE);
        prefContainer.setVisibility(View.VISIBLE);

        Activity act = getActivity();

        try {
            CoreHandler.loadCoreForce(act);
            commitText.setText(Utils.PROP_CORE_COMMIT + "@" + Utils.PROP_CORE_BRANCH);
        } catch (Exception e) {
            e.printStackTrace();
            Utils.showDialog(act, "Error", "An error occured while loading core.\n\n" + e.getMessage());
        }
    }
}
