package me.mamiiblt.instafel.patcher.mobile.fragments;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ProgressBar;

import me.mamiiblt.instafel.patcher.mobile.R;

public class HomeFragment extends Fragment {

    ProgressBar loadingBar;
    ConstraintLayout layout;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_home, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        loadingBar = view.findViewById(R.id.loading_spinner);
        layout = view.findViewById(R.id.home_layout);

        loadingBar.setVisibility(View.VISIBLE);
        layout.setVisibility(View.GONE);

    }
}