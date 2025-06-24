## Başlamadan önce

İlk olarak bilmeniz gereken şey, Instafel doğal olarak sadece kullanıcıların erişiminin olmaması gerektiği (Private API vb.) projelerin kaynak kodunu paylaşmaz. Bu kısımlar Instafel için yazılan toplam kodun %20'si gibi bir kısımı oluşturur. Yani uygulama kodlarını incelerken API veya bilinmeyen bir mikroservis / alt proje ile iletişime geçildiğinde şaşırmamanız gerekmektedir.

## Giriş

Instafel'in kaynak kodlarını [mamiiblt/instafel](https://github.com/mamiiblt/instafel) deposundan çekebilirsiniz. Instafel dependency ve alt projelerin yönetimi gibi hususlar için Gradle yöneticisini kullanmaktadır. Instafel toplamda 5 alt projeden oluşmaktadır, her alt projenin farklı bir amacı vardır.

- **App**

  Instafel menüsü, diyalogları gibi bileşenleri içerir. Kodlarda değişiklik yaparken yazdığınız kodların Instagram'ın dahili libleri ile uyumlu olması gerektiğini unutmayın.

- **Updater**

  Tek başına yani standalone bir uygulama olarak yayımlanır. Temel amacı uygulamayı manuel olarak güncelleme derdinden kurtarıp Shizuku ve Root kullanarak otomasyon sağlamaktır.

- **Patcher**

  Normal kullanıcıları ilgilendiren bir alt proje değildir. Instafel APKlarının üretilmesinden sorumludur. Patcher App'in derlenen hallerini (dex, arsc dosyaları gibi) işleyerek Instagram APK'sının içerisine yerleştirir ve kod bağlantılarını yapar.

- **GPlayAPI**

  En güncel alpha apklarını Google Play'den çekerek Patcher'ı tetikler, bu sayede tam otomasyon sağlanır

- **Website**

  Şu an gezinmekte olduğunuz websitenin kodlarını içermektedir. NextJS ve Shacn/UI kullanılarak yapılmışır.

## Instafel Config Nedir?

Instafel config dosyası **config/example.ifl_config.json** içinde bulunabilir. Bu dosya alt projelerin derlenirken alacağı sürüm bilgileri, etiketleri ve kütüphane yönetimi gibi detayları belirtir. Gradle Settings bu dosyadan okuma yaparak süreci yönetir. Normal bir geliştiricinin bu dosya (ve bu dosyayı ilgilendiren kısımlar) ile gerekmediği sürece hiçbir alakası olmamalıdır.
