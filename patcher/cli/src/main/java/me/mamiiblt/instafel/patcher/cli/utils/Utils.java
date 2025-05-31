package me.mamiiblt.instafel.patcher.cli.utils;

import java.io.File;
import java.io.InputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.jar.Attributes;
import java.util.jar.Manifest;

public class Utils {
    public static String PROP_CLI_VERSION, PROP_CLI_COMMIT_HASH , PROP_CLI_PROJECT_TAG, PROP_CLI_PROJECT_BRANCH;
    public static String PROP_CORE_COMMIT, PROP_CORE_BRANCH;
    public static String USER_DIR = System.getProperty("user.dir");

    public static void readPatcherProps()  {
        try {
            InputStream stream = Utils.class.getResourceAsStream("/META-INF/MANIFEST.MF");
            Manifest manifest = new Manifest(stream);
            Attributes attr = manifest.getMainAttributes();

            PROP_CLI_VERSION = attr.getValue("Patcher-Cli-Version");
            PROP_CLI_COMMIT_HASH = attr.getValue("Patcher-Cli-Commit");
            PROP_CLI_PROJECT_TAG = attr.getValue("Patcher-Cli-Tag");
            PROP_CLI_PROJECT_BRANCH = attr.getValue("Patcher-Cli-Branch");
        } catch (Exception e) {
            e.printStackTrace();
            Log.severe("Error while organizing environment.");
            System.exit(-1);
        }
    }

    public static void printPatcherHeader() {
        System.out.println("Instafel Patcher v" + PROP_CLI_VERSION);
        System.out.println("by mamiiblt");
        System.out.println("");
    }

    public static String getPatcherFolder() {
        String OS = System.getProperty("os.name").toLowerCase();

        File base = new File(System.getProperty("user.home"));
        Path path;
        if (OS.contains("mac")) {
            path = Paths.get(base.getAbsolutePath(), "Library", "ipatcher");
        } else if (OS.contains("win")) {
            path = Paths.get(base.getAbsolutePath(), "AppData", "Local", "ipatcher");
        } else {
            String xdgDataFolder = System.getenv("XDG_DATA_HOME");
            if (xdgDataFolder != null) {
                path = Paths.get(xdgDataFolder, "ipatcher", "framework");
            } else {
                path = Paths.get(base.getAbsolutePath(), ".local", "share", "ipatcher");
            }
        }
        
        return path.toString(); 
    }
}
