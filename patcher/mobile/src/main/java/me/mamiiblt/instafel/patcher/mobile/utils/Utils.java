package me.mamiiblt.instafel.patcher.mobile.utils;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;

import com.google.android.material.dialog.MaterialAlertDialogBuilder;

import brut.androlib.ApktoolProperties;
import me.mamiiblt.instafel.patcher.mobile.BuildConfig;

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

    public static void showDecompilerInfoDialog(Context ctx) {
        new MaterialAlertDialogBuilder(ctx)
                .setTitle("Apktool v" + ApktoolProperties.getVersion())
                .setMessage("baksmali: v" + ApktoolProperties.getBaksmaliVersion() + "\n"
                    + "smali: v" + ApktoolProperties.getSmaliVersion() + "\n\n"
                    + "Thanks to Apktool for make Instafel Patcher possible!")
                .setNegativeButton("View Project", (dialog, which) -> openInBrowser(ctx, Uri.parse("https://apktool.org")))
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
