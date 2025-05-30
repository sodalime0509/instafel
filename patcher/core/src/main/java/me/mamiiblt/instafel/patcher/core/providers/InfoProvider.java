package me.mamiiblt.instafel.patcher.core.providers;

import java.io.InputStream;
import java.util.Properties;

import org.json.JSONObject;

import me.mamiiblt.instafel.patcher.core.utils.Log;

public class InfoProvider {
    public static JSONObject getCoreInfo() {
        try {
            Properties coreProperties = new Properties();
            InputStream in = InfoProvider.class.getClassLoader().getResourceAsStream("patcher-core.properties");
            coreProperties.load(in);

            JSONObject coreInfo = new JSONObject();
            coreInfo.put("core_commit", coreProperties.getProperty("patcher.core.commit"));
            coreInfo.put("core_branch", coreProperties.getProperty("patcher.core.branch"));
            return coreInfo;
        } catch (Exception e) {
            e.printStackTrace();
            Log.severe("Error while organizing environment.");
            return null;
        }
    }
}
