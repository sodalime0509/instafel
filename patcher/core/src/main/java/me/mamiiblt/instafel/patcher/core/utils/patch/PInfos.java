package me.mamiiblt.instafel.patcher.core.utils.patch;

import java.lang.annotation.*;

public class PInfos {

    @Retention(RetentionPolicy.RUNTIME) 
    @Target(ElementType.TYPE)
    public @interface PatchInfo {
        String name();
        String author();
        String desc();
        String shortname();
        boolean isSingle();
    }

    @Retention(RetentionPolicy.RUNTIME) 
    @Target(ElementType.TYPE)
    public @interface PatchGroupInfo {
        String name();
        String author();
        String desc();
        String shortname();
    }
}
