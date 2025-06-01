package me.mamiiblt.instafel.patcher.mobile.utils;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.ActivityInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageInstaller;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.PowerManager;
import android.provider.Settings;
import android.util.Log;

import androidx.preference.PreferenceManager;

import com.google.android.material.dialog.MaterialAlertDialogBuilder;

import java.util.List;

import me.mamiiblt.instafel.patcher.mobile.BuildConfig;
import me.mamiiblt.instafel.patcher.mobile.R;
import rikka.shizuku.Shizuku;

public class Utils {

    public static void openInBrowser(Context ctx, Uri uri) {
        Intent intent = new Intent("android.intent.action.VIEW", uri);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        ctx.startActivity(intent);
    }

    public static void showAppInfoDialog(Context ctx) {
        new MaterialAlertDialogBuilder(ctx)
                .setTitle("About Patcher")
                .setMessage("version: v" + BuildConfig.VERSION_NAME +
                        "\ncommit: " + BuildConfig.COMMIT + "@" + BuildConfig.BRANCH +
                        "\nchannel: " + BuildConfig.BUILD_TYPE +
                        "\n\n Developed with ❤\uFE0F by mamiiblt"
                )
                .setNegativeButton("View Commit", (dialog, which) -> openInBrowser(ctx, Uri.parse("https://github.com/mamiiblt/instafel/commit/" + BuildConfig.COMMIT)))
                .setPositiveButton("Okay", null)
                .show();
    }

    public static void showDialog(Context ctx, String title, String message) {
        new MaterialAlertDialogBuilder(ctx)
                .setTitle(title)
                .setMessage(message)
                .setNegativeButton(android.R.string.yes, null)
                .setIcon(android.R.drawable.ic_dialog_alert)
                .show();
    }
}
