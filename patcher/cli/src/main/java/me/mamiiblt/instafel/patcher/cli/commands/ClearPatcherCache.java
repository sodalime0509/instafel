package me.mamiiblt.instafel.patcher.cli.commands;

import java.io.File;

import org.apache.commons.io.FileUtils;

import me.mamiiblt.instafel.patcher.cli.handlers.Command;
import me.mamiiblt.instafel.patcher.cli.utils.Log;
import me.mamiiblt.instafel.patcher.cli.utils.Utils;

public class ClearPatcherCache implements Command {

    @Override
    public void execute(String[] args) {
        try {
            File cacheFolder = new File(Utils.getPatcherFolder());
            Log.info("Cache folder path is " + cacheFolder.getAbsolutePath());
            if (cacheFolder.exists()) {
                FileUtils.deleteDirectory(cacheFolder);
                Log.info("Cache folder deleted succesfully.");
            } else {
                Log.warning("No any cache folder found.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            Log.severe("Error while clearing cache folder.");
        }
    }
    
}
