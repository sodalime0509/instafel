package me.mamiiblt.instafel.patcher.cli.utils;

import java.io.InputStream;
import java.util.Properties;

public class Utils {
    public static String PROP_CLI_VERSION, PROP_CLI_COMMIT_HASH , PROP_CLI_PROJECT_TAG, PROP_CLI_PROJECT_BRANCH;
    public static String PROP_CORE_COMMIT, PROP_CORE_BRANCH;
    public static String USER_DIR = System.getProperty("user.dir");

    public static void readPatcherProps()  {
        try {
            Properties patcherProperties = new Properties();
            InputStream in = Utils.class.getClassLoader().getResourceAsStream("patcher.properties");
            patcherProperties.load(in);

            PROP_CLI_VERSION = patcherProperties.getProperty("patcher.cli.version");
            PROP_CLI_COMMIT_HASH = patcherProperties.getProperty("patcher.cli.commit");
            PROP_CLI_PROJECT_TAG = patcherProperties.getProperty("patcher.cli.tag");
            PROP_CLI_PROJECT_BRANCH = patcherProperties.getProperty("patcher.cli.branch");
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
}
