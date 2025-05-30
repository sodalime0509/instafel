plugins {
    java
    application
    id("com.gradleup.shadow") version "8.3.6"
    id("maven-publish")
}

val libs = rootProject.extra["patcherLibs"] as Map<*, *>
var config = rootProject.extra["instafelConfig"] as Map<*, *>
val projectConfig = config["patcher"] as Map<*, *>
val projectVersion = projectConfig["version"] as String
val projectTag = projectConfig["tag"] as String

val commitHash: String by rootProject.extra

group = "me.mamiiblt.instafel"
version = "v$projectVersion-$commitHash-$projectTag"

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

application {
    mainClass = "me.mamiiblt.instafel.patcher.cli.Main"
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

tasks.register("generate-patcher-props") {
    doLast {
        val outputFile = File("${project.projectDir}/src/main/resources/patcher.properties")
        outputFile.writeText("""
            patcher.cli.version=$projectVersion
            patcher.cli.commit=$commitHash
            patcher.cli.branch=main
            patcher.cli.tag=$projectTag
        """.trimIndent())

        println("Patcher property file created")
    }

    mustRunAfter("clear-cache")

}

tasks.shadowJar {
    archiveBaseName = "ifl-patcher"
    archiveClassifier = ""
    destinationDirectory.set(file("${rootProject.rootDir}/instafel.patcher/output"))
    mustRunAfter("generate-patcher-props")
}

tasks.withType<JavaCompile> {
    options.compilerArgs.add("-Xlint:deprecation")
}

tasks.register("build-jar") {
    dependsOn("clear-cache", "generate-patcher-props", "shadowJar")

    doLast {
        delete(file("${project.projectDir}/build"))
        delete(file("${project.projectDir}/bin"))
        println("Temp build caches cleared.")
        println("All build tasks completed successfully")
    }
}