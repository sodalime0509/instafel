package me.mamiiblt.instafel.patcher.cli.commands;

import org.json.JSONArray;
import org.json.JSONObject;

import me.mamiiblt.instafel.patcher.cli.handlers.Command;
import me.mamiiblt.instafel.patcher.cli.handlers.CoreHandler;

public class ListPatches implements Command {

    @Override
    public void execute(String[] args) {
        try {
            JSONObject patchInfos = (JSONObject) CoreHandler.invokeNonParamMethod(
                "providers.InfoProvider",
                "getPatchesList", null
            );

            System.out.println("Patches: ");
            JSONArray singlePatches = patchInfos.getJSONArray("singles");
            for (int i = 0; i < singlePatches.length(); i++) {
                JSONObject info = singlePatches.getJSONObject(i);
                System.out.println("    • " + getPatchInfoString(info.getString("name"), info.getString("shortname")));
            }

            System.out.println("Patch Groups:");
            JSONArray groupPatches = patchInfos.getJSONArray("groups");
            for (int i = 0; i < groupPatches.length(); i++) {
                JSONObject patchGroupInfo = groupPatches.getJSONObject(i);
                System.out.println("    • " + getPatchInfoString(patchGroupInfo.getString("name"), patchGroupInfo.getString("shortname")));

                for (int a = 0; a < patchGroupInfo.getJSONArray("infos").length(); a++) {
                    JSONObject info = patchGroupInfo.getJSONArray("infos").getJSONObject(a);
                    System.out.println("        • " + getPatchInfoString(info.getString("name"), info.getString("shortname")));
                }
            }

            System.out.println("");
            System.out.println("Use run <wdir> name... for executing patches / patch groups");
            System.out.println("Totally found " + patchInfos.getInt("total_size") + " patch.");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

     private String getPatchInfoString(String name, String shortname) {
        return name + " (" + shortname + ")";
    }
    
}
