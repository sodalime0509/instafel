package me.mamiiblt.instafel.patcher.cli;

import me.mamiiblt.instafel.patcher.cli.handlers.CommandHandler;
import me.mamiiblt.instafel.patcher.cli.handlers.CoreHandler;
import me.mamiiblt.instafel.patcher.cli.utils.Log;
import me.mamiiblt.instafel.patcher.cli.utils.Utils;

public class Main {
    public static void main(String[] args)  {

        System.setProperty("java.awt.headless", "true");
        System.setProperty("jdk.nio.zipfs.allowDotZipEntry", "true");
        System.setProperty("jdk.util.zip.disableZip64ExtraFieldValidation", "true");

        Log.setupLogger();
        Utils.readPatcherProps();
        Utils.printPatcherHeader();
        new CoreHandler();
        new CommandHandler(args);
    }
}
