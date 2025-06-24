## İlk bakış

Instafel projelerini aşağıdaki yönergeleri uygulayarak çok kolayca derleyebilirsiniz. Derleme işlemlerini gerçekleştirirken Java 17+ ve NPM 20+ sürümlerine sahip olduğunuza emin olun.

## App

Gradle Build dosyasını **app/build.gradle.kts** konumunda bulabilirsiniz. Bu proje derlenebilmek için Java 17 ve üstü bir Java gerektirir. App, **Debug** ve **Release** olmak üzere iki farklı kanalda derlenebilir. APK çıktıları daima olarak **app/output/ifl-app-xxxxx-tag.apk** konumuna çıkarılacaktır.

Debug APK çıktısı alabilmek için aşağıdaki komut kullanılmalıdır.
`./gradlew :app:generate-app-debug`  
Eğer Release APK almak isterseniz ise şu komutu çalıştırabilirsiniz.
`./gradlew :app:generate-app-release`

Ek olarak bilmeniz gereken şey ise bu projenin normal kullanımda Instagram APK'sı ile aynı kütüphanelere sahip olmadığı için (örn Instagram APKları kısıtlanmış bir AndroidX kütüphanesi sunar) davranışlarının değişkenlik gösterebileceğidir.

## Updater

Gradle Build dosyasını **updater/build.gradle.kts** konumunda bulabilirsiniz. Bu proje derlenebilmek için Java 17 ve üstü bir Java gerektirir. Updater, **Debug** ve **Release** olmak üzere iki farklı kanalda derlenebilir. APK çıktıları daima olarak **updater/output/ifl-updater-xxxxx-tag.apk** konumuna çıkarılacaktır.

Debug APK çıktısı alabilmek için aşağıdaki komut kullanılmalıdır.
`./gradlew :updater:generate-app-debug`  
Eğer Release APK almak isterseniz ise şu komutu çalıştırabilirsiniz.
`./gradlew :updater:generate-app-release`

## GPlayAPI

Bu proje standalone bir JAR dosyası üretir. Çıktı dosyası **gplayapi/output/ifl-gplayapi-xxxxx.jar** olarak kaydedilir. JAR dosyası üretebilmek için aşağıdaki komutu çalıştırabilirsiniz.
`./gradlew :gplayapi:build-jar`

## Website

Websitesi NextJS sayesinde kodlanmıştır, bağımlılıkların kurulumu, paket yönetimi konulara [NextJS Docs](https://nextjs.org/docs) üzerinden erişebilirsiniz. Instafel Websitesi için istisnai bir durum yoktur.
