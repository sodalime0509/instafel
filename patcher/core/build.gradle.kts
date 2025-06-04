plugins {
    java
    application
    `java-library`
}

val libs = rootProject.extra["patcherLibs"] as Map<*, *>
val config = rootProject.extra["instafelConfig"] as Map<*, *>
val projectConfig = config["patcher"] as Map<*, *>
val coreSupportedVersion = projectConfig["core_supported_version"] as String
val commitHash: String by rootProject.extra

// use SDK 34 for compalibility
val d8Executable = System.getenv("ANDROID_HOME") + "/build-tools/34.0.0/d8"
val dexOutputDir = file("${buildDir}/tmp/dex")
val mergedJar = file("${rootProject.rootDir}/patcher/output/ifl-pcore-$commitHash.jar")

group = "me.mamiiblt.instafel"
version = "$commitHash-sd"

apply(from = "publish.gradle.kts")

repositories {
    mavenCentral()
    google()
    maven("https://jitpack.io")
}

dependencies {
    implementation(libs["org-json"]!!)
    implementation(libs["commons-io"]!!)
    implementation(libs["okhttp"]!!)
    implementation(libs["apktool-lib"]!!)
    implementation(libs["classgraph"]!!)
    implementation(libs["jackson-databind"]!!)
    implementation(libs["jackson-yaml"]!!)
}

tasks.register("clear-cache") {
    val filesToDelete = listOf(
        file("${project.projectDir}/bin"),
        file("${project.projectDir}/build"),
    )

    delete(filesToDelete)
    doLast {
        println("Cache successfully deleted.")
    }
}

tasks.named<Jar>("jar") {
    archiveBaseName.set("ifl-pcore")
    archiveClassifier.set("")
    destinationDirectory.set(file("${rootProject.rootDir}/patcher/output"))
    manifest {
        attributes(
            "Patcher-Core-Commit" to commitHash,
            "Patcher-Core-Supported-Version" to coreSupportedVersion,
            "Patcher-Core-Branch" to "main"
        )
    }

    mustRunAfter("clear-cache")
}

tasks.register("dexify") {
    dependsOn("jar")
    doLast {
        dexOutputDir.mkdirs()

        exec {
            commandLine(
                d8Executable,
                "--output", dexOutputDir.absolutePath,
                tasks.named<Jar>("jar").get().archiveFile.get().asFile.absolutePath
            )
        }

        println("Dexification complete. classes.dex generated.")
    }
}

tasks.register("mergeJarWithDex") {
    dependsOn("dexify")
    doLast {
        val originalJar = tasks.named<Jar>("jar").get().archiveFile.get().asFile
        val dexFile = File(dexOutputDir, "classes.dex")

        ant.withGroovyBuilder {
            "zip"("destfile" to mergedJar) {
                "zipfileset"("src" to originalJar)
                "zipfileset"("file" to dexFile, "fullpath" to "classes.dex")
            }
        }

        originalJar.delete()

        println("Merged JAR created at: ${mergedJar.absolutePath}")
    }
}

tasks.register("build-jar") {
    dependsOn("clear-cache", "mergeJarWithDex")
    doLast {
        delete(file("${project.projectDir}/build"))
        delete(file("${project.projectDir}/bin"))
        println("All build tasks completed successfully with merged JAR.")
    }
}
