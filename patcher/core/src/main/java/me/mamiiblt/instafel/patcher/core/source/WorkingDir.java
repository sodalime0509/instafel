package me.mamiiblt.instafel.patcher.core.source;

import org.apache.commons.io.FileUtils;

import me.mamiiblt.instafel.patcher.core.utils.Log;
import me.mamiiblt.instafel.patcher.core.utils.Utils;

import java.io.File;
import java.io.IOException;

public class WorkingDir {

    public static String createWorkingDir(String PDIR, String igApkFileName) throws IOException {
        String folderName = igApkFileName.replace(".apk", "");
        File dirPath = new File(Utils.mergePaths(PDIR, folderName));
        if (dirPath.exists()) {
            Log.severe("Working directory for this apk is already exists, delete it or continue from the project.");
            System.exit(-1);
            return null;
        } else {
            FileUtils.forceMkdir(dirPath);
            Log.info("Project working directory succesfully created.");
            return dirPath.getAbsolutePath();
        }
    }

    public static String getExistsWorkingDir(File folderDir) {
        if (folderDir.isDirectory()) {
            if (folderDir.exists()) {
                return folderDir.getAbsolutePath();
            } else {
                Log.severe("Working directory not exists, please create it or use different working dir.");
                System.exit(-1);
                return null;
            }
        } else {
            Log.severe("Its's not an directory bro...");
            System.exit(-1);
            return null;
        }
    }
}
