package me.mamiiblt.instafel.patcher.mobile.fragments;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import me.mamiiblt.instafel.patcher.mobile.R;

public class PatchesFragment extends Fragment {
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_patches, container, false);
        return view;
    }
}