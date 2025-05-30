plugins {
    java
    application
    `java-library`
}

val libs = rootProject.extra["patcherLibs"] as Map<*, *>

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

tasks.register("generate-patcher-props") {
    doLast {
        val outputFile = File("${project.projectDir}/src/main/resources/patcher-core.properties")
        outputFile.writeText("""
            patcher.core.commit=$commitHash
            patcher.core.branch=main
        """.trimIndent())

        println("Patcher property file created")
    }
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
    destinationDirectory.set(file("${rootProject.rootDir}/instafel.patcher/output"))
    manifest {
        attributes["Implementation-Title"] = "Instafel Patcher Core"
        attributes["Implementation-Commit"] = version
    }

    mustRunAfter("clear-cache")
}

tasks.register("build-jar") {
    dependsOn("clear-cache", "generate-patcher-props", "jar")

    doLast {
        delete(file("${project.projectDir}/build"))
        delete(file("${project.projectDir}/bin"))
        println("All build tasks completed successfully")
    }
}