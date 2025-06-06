package me.mamiiblt.instafel.patcher.mobile.handlers.utils;

import me.mamiiblt.instafel.patcher.mobile.utils.UpdateInfo;

public interface ICoreRequest {
    void onSuccess(UpdateInfo info);

    default void requiresNeverVersion() {

    }

    void onError(Exception e);
}
