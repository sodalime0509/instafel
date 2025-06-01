package me.mamiiblt.instafel.patcher.cli.commands;

import java.io.File;
import java.lang.reflect.Method;
import java.nio.file.Paths;

import me.mamiiblt.instafel.patcher.cli.handlers.Command;
import me.mamiiblt.instafel.patcher.cli.handlers.CoreHandler;
import me.mamiiblt.instafel.patcher.cli.utils.Log;
import me.mamiiblt.instafel.patcher.cli.utils.Utils;

public class BuildCmd implements Command {

    @Override
    public void execute(String[] args) {
        try {
            if (args.length != 0) {
                File srcFolder = new File(Paths.get(Utils.USER_DIR, args[0]).toString());
                    
                if (!srcFolder.exists()) {
                    Log.severe("The specified folder does not exist: " + srcFolder.getAbsolutePath());
                    return;
                }

                Class<?> clazz = CoreHandler.coreClassLoader.loadClass("me.mamiiblt.instafel.patcher.core.jobs.BuildProject");
                Object instance = clazz.getDeclaredConstructor().newInstance();
                Method method = clazz.getMethod("buildProject", File.class, String.class, String.class, String.class);
                
                Thread task = new Thread(() -> {
                    try {
                        method.invoke(instance, srcFolder, Utils.PROP_CORE_COMMIT, Utils.PROP_CLI_PROJECT_TAG, Utils.PROP_CLI_VERSION);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                });
                task.start();
            } else {
                Log.info("Wrong commage usage type, use like that;");
                Log.info("java -jar patcher.jar build insta_folder");
            }
        } catch (Exception e) {
            e.printStackTrace();
            Log.severe("Error while running command...");
            System.exit(-1);
        }
    }

}
