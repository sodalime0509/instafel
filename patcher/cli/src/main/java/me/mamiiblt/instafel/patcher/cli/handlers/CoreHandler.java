package me.mamiiblt.instafel.patcher.cli.handlers;

import java.io.File;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.URLClassLoader;
import java.nio.file.Paths;

import org.json.JSONObject;

import me.mamiiblt.instafel.patcher.cli.utils.Log;
import me.mamiiblt.instafel.patcher.cli.utils.Utils;

public class CoreHandler {
    public static URLClassLoader coreClassLoader;
    public static final String CORE_PACKAGE_NAME = "me.mamiiblt.instafel.patcher.core";

    public static Object invokeNonParamMethod(String className, String methodName, Class<?>[] paramTypes, Object... args) {
        try {
            Class<?> clazz = coreClassLoader.loadClass(CORE_PACKAGE_NAME + "." + className);
            Method method = clazz.getMethod(methodName, paramTypes);
            return method.invoke(null, args);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static void loadCoreInfo() {
        try {
            JSONObject coreInfo = (JSONObject) invokeNonParamMethod(
                "providers.InfoProvider", 
                "getCoreInfo", null);
            if (coreInfo != null) {
                Utils.PROP_CORE_COMMIT = coreInfo.getString("core_commit");
                Utils.PROP_CORE_BRANCH = coreInfo.getString("core_branch");
            } else {
                throw new Exception("Core commit is not a string, something went wrong.");
            }
        } catch (Exception e) {
            Log.severe("Error while loading sources from core: " + e.getMessage());
            System.exit(-1);
        }

    }

    public static void loadCoreJAR() {
        try {
            File coreJar = new File(Paths.get(Utils.USER_DIR, "ifl-pcore-7777878.jar").toString());

            if (!coreJar.exists()) {
                Log.severe("Core JAR not found, mami bunu dinamik olarak indirme ekleyecek.");
                System.exit(-1);
            }

            coreClassLoader = new URLClassLoader(new URL[]{coreJar.toURI().toURL()}, CoreHandler.class.getClassLoader());
        } catch (Exception e) {
            Log.severe("Error while loading core JAR: " + e.getMessage());
        }
        
    }
}
