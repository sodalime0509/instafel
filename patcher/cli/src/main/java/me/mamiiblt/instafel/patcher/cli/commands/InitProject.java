package me.mamiiblt.instafel.patcher.cli.commands;

import java.io.File;
import java.lang.reflect.Method;
import java.nio.file.Paths;

import me.mamiiblt.instafel.patcher.cli.handlers.Command;
import me.mamiiblt.instafel.patcher.cli.handlers.CoreHandler;
import me.mamiiblt.instafel.patcher.cli.utils.Log;
import me.mamiiblt.instafel.patcher.cli.utils.Utils;

public class InitProject implements Command {

    @Override
    public void execute(String[] args) {
        try {
            if (args.length != 0) {
                String fileArgument = args[0];
                if (fileArgument.contains(".apk") || fileArgument.contains(".zip")) {
                    File apkFile = new File(Paths.get(Utils.USER_DIR, fileArgument).toString());
                    
                    if (!apkFile.exists()) {
                        Log.severe("The specified file does not exist: " + apkFile.getAbsolutePath());
                        return;
                    }

                    Class<?> clazz = CoreHandler.coreClassLoader.loadClass("me.mamiiblt.instafel.patcher.core.jobs.InitializeProject");
                    Method method = clazz.getMethod("runInitProject", File.class, File.class);
                    File pdir = new File(Utils.USER_DIR);

                    Thread task = new Thread(() -> {
                        try {
                            method.invoke(null, pdir, apkFile);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    });
                    task.start();
                } else {
                    Log.warning("Please select an .apk file");
                }
            } else {
                Log.info("Wrong commage usage type, use like that;");
                Log.info("java -jar patcher.jar init instagram.apk");
            }
        } catch (Exception e) {
            e.printStackTrace();
            Log.severe("Error while running command");
            System.exit(-1);
        }
    }
    
}
