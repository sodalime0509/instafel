package me.mamiiblt.instafel.patcher.cli.commands;

import java.io.File;
import java.lang.reflect.Method;
import java.nio.file.Paths;
import java.util.Arrays;

import me.mamiiblt.instafel.patcher.cli.handlers.Command;
import me.mamiiblt.instafel.patcher.cli.handlers.CoreHandler;
import me.mamiiblt.instafel.patcher.cli.utils.Log;
import me.mamiiblt.instafel.patcher.cli.utils.Utils;

public class RunPatch implements Command {

    @Override
    public void execute(String[] args) {
        try {
            if (args.length == 0) {
                Log.info("Wrong command usage, use like that:");
                Log.info("java -jar patcher.jar run <wdir> <patch_name> [<patch_name> ...]");
                return;
            }

            File projectDir = new File(Paths.get(Utils.USER_DIR, args[0]).toString());
            if (!projectDir.exists()) {
                Log.severe("Working directory does not exist: " + projectDir);
                return;
            }
            
            Class<?> clazz = CoreHandler.coreClassLoader.loadClass("me.mamiiblt.instafel.patcher.core.jobs.RunPatches");
            Method method = clazz.getMethod("runPatches", File.class, String[].class);
            String[] shortNames = Arrays.copyOfRange(args, 0, args.length);
            method.invoke(null, projectDir, shortNames);
        } catch (Exception e) {
            e.printStackTrace();
            Log.severe("Error while running patches");
            System.exit(-1);
        }
    }
    
}
