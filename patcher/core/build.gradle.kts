plugins {
    java
    application
    `java-library`
}

val libs = rootProject.extra["patcherLibs"] as Map<*, *>
var config = rootProject.extra["instafelConfig"] as Map<*, *>
val projectConfig = config["patcher"] as Map<*, *>
val coreSupportedVersion = projectConfig["core_supported_version"] as String
val commitHash: String by rootProject.extra

group = "me.mamiiblt.instafel"
version = "$commitHash"

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

tasks.register("build-jar") {
    dependsOn("clear-cache", "jar")

    doLast {
        delete(file("${project.projectDir}/build"))
        delete(file("${project.projectDir}/bin"))
        println("All build tasks completed successfully")
    }
}