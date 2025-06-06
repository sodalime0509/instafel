package me.mamiiblt.instafel.patcher.mobile.handlers;

import android.app.Activity;
import android.os.Handler;
import android.os.Looper;


import androidx.fragment.app.FragmentActivity;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.nio.file.Files;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;
import java.util.stream.Collectors;

import dalvik.system.DexClassLoader;
import me.mamiiblt.instafel.patcher.mobile.handlers.utils.ICoreRequest;
import me.mamiiblt.instafel.patcher.mobile.utils.UpdateInfo;
import me.mamiiblt.instafel.patcher.mobile.utils.Utils;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.ResponseBody;

public class CoreHandler {

    public static DexClassLoader coreClassLoader;
    public static String CORE_PACKAGE_NAME = "me.mamiiblt.instafel.patcher.core";
    public static File coreJarFile(Activity act) {
        File jarFile = new File(act.getCodeCacheDir(), "core.jar");
        jarFile.setWritable(false);
        return jarFile;
    }

    public static void loadCoreSafely(Activity act) throws Exception {
        if (coreClassLoader == null) {
            CoreUtils.loadCore(act);
            CoreUtils.loadCoreInfo(coreJarFile(act));
        }
    }

    public static void loadCoreForce(Activity act) throws Exception {
        CoreUtils.loadCore(act);
        CoreUtils.loadCoreInfo(coreJarFile(act));
    }

    public static void forceDownloadCore(FragmentActivity act, ICoreRequest coreCheck) {
        getLatestCoreUpdateInfoAsync(new ICoreRequest() {
            @Override
            public void onSuccess(UpdateInfo info) {
                downloadCoreJAR(info, act, new ICoreRequest() {
                    @Override
                    public void onSuccess(UpdateInfo info) {
                        coreCheck.onSuccess(info);
                    }

                    @Override
                    public void onError(Exception e) {
                        coreCheck.onError(e);
                    }
                });
            }

            @Override
            public void requiresNeverVersion() {
                Utils.showDialog(act, "Error", "Latest core requires newer version of patcher, please update your patcher to latest version.");
            }

            @Override
            public void onError(Exception e) {
                Utils.showDialog(act, "Error", "An error occured while sending requests, " + e.getMessage());
            }
        });
    }

    public static JSONObject getPatchesJSON(Activity act) throws Exception {
        JarFile jarFile = new JarFile(coreJarFile(act));
        JarEntry entry = jarFile.getJarEntry("patches.json");
        InputStream inputStream = jarFile.getInputStream(entry);
        String content = new BufferedReader(new InputStreamReader(inputStream))
                .lines()
                .collect(Collectors.joining("\n"));
        return new JSONObject(content);
    }

    public static void downloadCoreJAR(UpdateInfo updateInfo, Activity act, ICoreRequest callback) {
        ExecutorService executor = Executors.newSingleThreadExecutor();
        Handler handler = new Handler(Looper.getMainLooper());

        executor.execute(() -> {
            String URL = "https://github.com/mamiiblt/instafel/raw/refs/heads/ft-releases/p-core/dist/ifl-pcore-" + updateInfo.commit + ".jar";
            OkHttpClient client = new OkHttpClient();
            Request request = new Request.Builder().url(URL).build();

            try (Response response = client.newCall(request).execute()) {
                if (response.isSuccessful() && response.body() != null) {
                    try (ResponseBody body = response.body();
                         InputStream inputStream = body.byteStream();
                         OutputStream outputStream = Files.newOutputStream(coreJarFile(act).toPath())) {
                        byte[] buffer = new byte[4096];
                        int bytesRead;

                        while ((bytesRead = inputStream.read(buffer)) != -1) {
                            outputStream.write(buffer, 0, bytesRead);
                        }
                    }

                    handler.post(() -> callback.onSuccess(updateInfo));
                } else {
                    handler.post(() -> callback.onError(new Exception("An error occured while connecting server, " + response.code())));
                }
            } catch (Exception e) {
                e.printStackTrace();
                handler.post(() -> callback.onError(e));
            }
        });
    }

    public static void getLatestCoreUpdateInfoAsync(ICoreRequest callback) {
        ExecutorService executor = Executors.newSingleThreadExecutor();
        Handler handler = new Handler(Looper.getMainLooper());

        executor.execute(() -> {
            OkHttpClient client = new OkHttpClient();
            Request request = new Request.Builder()
                    .url("https://raw.githubusercontent.com/mamiiblt/instafel/refs/heads/ft-releases/p-core/latest.json")
                    .build();

            try (Response response = client.newCall(request).execute()) {
                if (response.isSuccessful() && response.body() != null) {
                    JSONObject jsonObject = new JSONObject(response.body().string());
                    UpdateInfo updateInfo = new UpdateInfo();
                    updateInfo.commit = jsonObject.getString("commit");
                    updateInfo.supported_pversion = jsonObject.getString("supported_pversion");
                    updateInfo.updated_at = jsonObject.getString("updated_at");

                    if (!updateInfo.supported_pversion.equals(Utils.PATCHER_VERSION)) {
                        handler.post(() -> callback.requiresNeverVersion());
                    } else {
                        handler.post(() -> callback.onSuccess(updateInfo));
                    }
                } else {
                    handler.post(() -> callback.onError(
                            new Exception("An error occurred while reading/sending API request")));
                }
            } catch (Exception e) {
                e.printStackTrace();
                handler.post(() -> callback.onError(e));
            }
        });
    }

}
