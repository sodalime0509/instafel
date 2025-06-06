package me.mamiiblt.instafel.patcher.mobile.handlers;

import static me.mamiiblt.instafel.patcher.mobile.handlers.CoreHandler.CORE_PACKAGE_NAME;
import static me.mamiiblt.instafel.patcher.mobile.handlers.CoreHandler.coreClassLoader;

import android.app.Activity;
import android.content.Context;
import android.util.Log;

import java.io.File;
import java.lang.reflect.Method;
import java.util.jar.Attributes;
import java.util.jar.JarFile;
import java.util.jar.Manifest;

import dalvik.system.DexClassLoader;
import me.mamiiblt.instafel.patcher.mobile.utils.Utils;

public class CoreUtils {

    public static void loadCore(Activity act) {
        Log.i("IPatcher", "Loading core...");
        String optimizedDexDir = act.getDir("dex", Context.MODE_PRIVATE).getAbsolutePath();
        coreClassLoader = new DexClassLoader(
                CoreHandler.coreJarFile(act).getAbsolutePath(),
                optimizedDexDir,
                null,
                act.getClassLoader()
        );
        Log.i("IPatcher", "Core loaded succesfully...");
    }

    public static void loadCoreInfo(File jarFile) throws Exception {
        try {
            JarFile jar = new JarFile(jarFile);
            Manifest manifest = jar.getManifest();
            Attributes attr = manifest.getMainAttributes();
            Utils.PROP_CORE_COMMIT = attr.getValue("Patcher-Core-Commit");
            Utils.PROP_CORE_BRANCH = attr.getValue("Patcher-Core-Branch");
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("An error occured while loading core info, \n\n" + e.getMessage());
        }
    }

    public static Object invokeNonParamMethod(String className, String methodName, Class<?>[] paramTypes, Object... args) throws Exception {
        try {
            Class<?> clazz = CoreHandler.coreClassLoader.loadClass(CORE_PACKAGE_NAME + "." + className);
            Method method = clazz.getMethod(methodName, paramTypes);
            return method.invoke(null, args);
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("An error occured while calling method,\n\n" + e.getMessage());
        }
    }
}
