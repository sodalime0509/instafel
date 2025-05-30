package me.mamiiblt.instafel.patcher.core.utils.patch;

import java.util.List;

import me.mamiiblt.instafel.patcher.core.utils.Env;
import me.mamiiblt.instafel.patcher.core.utils.Log;
import me.mamiiblt.instafel.patcher.core.utils.SmaliUtils;
import me.mamiiblt.instafel.patcher.core.utils.patch.PInfos.PatchInfo;

public abstract class InstafelPatch {
    public String name, author, description, shortname;
    public boolean isSingle = true;
    public List<InstafelTask> tasks;

    public InstafelPatch() {
        try {
            PInfos.PatchInfo patchInfo = this.getClass().getAnnotation(PInfos.PatchInfo.class);
            if (patchInfo != null) {
                this.name = patchInfo.name();
                this.author = patchInfo.author();
                this.description = patchInfo.desc();
                this.shortname = patchInfo.shortname();
                this.isSingle = patchInfo.isSingle();
            } else {
                Log.severe("Please add PatchInfo for running patches");
                System.exit(-1);
            }
    
        } catch (Exception e) {
            e.printStackTrace();
            Log.severe("Error while creating InstafelPatch");
            System.exit(-1);
        }
    }

    public PatchInfo getPatchInfo() {
        return this.getClass().getAnnotation(PatchInfo.class);
    }

    public SmaliUtils getSmaliUtils() {
        return new SmaliUtils(Env.PROJECT_DIR);
    }
    
    public abstract List<InstafelTask> initializeTasks() throws Exception;

    public void loadTasks() throws Exception {
        tasks = initializeTasks();
    }
}
