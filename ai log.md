bu dosyaya we projesi dersi boyunca hafta hafta yapay zekaya yazdığımız promptları ve bize verdiği cevapları ve bu cevaplardan nasıl faydalandığımızı not edicez.
16 EKİM GÖREVİ
ai ya sorduğum soru ve bu cevabı  nasıl kullandım;

Ai ya Nasıl bir proje yapabilirim diye sordum cevap olarak

Yemek tarifi sitesi yapmamı önerdi ve bende onu yapmaya karar verdim.



Ai ya bu projenin hangi sorunları çözeceğini sordum cevap olarak

"Bugün ne pişirsem?" 
Dolaptaki malzemeleri değerlendirememe ve gıda israfı
Karmaşık ve güvenilmez tarifler
Bütçe ve zaman kısıtı
Kişiselleştirilmiş beslenme ihtiyaçları.


# TazeSofra - (AI Log)

**Geliştirici:** Yasin Karaman
**Ders:** Web Proje Yönetimi
**Kullanılan AI Aracı:** Google Gemini
**Proje Adı:** TazeSofra Web Arayüzü

## Proje Özeti
Bu projede, farklı beslenme tiplerine (Etli, Vejetaryen, Glutensiz) hitap eden, dinamik filtreleme yapabilen ve kullanıcı etkileşimli modern bir yemek tarifi arayüzü geliştirilmiştir. Geliştirme sürecinde kodlama asistanı olarak Google Gemini kullanılmış, ancak mimari kararlar ve proje akışı tarafımca yönetilmiştir.

---

## Geliştirme Aşamaları ve AI Yönlendirmeleri

### Aşama 1: Konseptin Belirlenmesi ve Temel İskelet
* **Verilen Komut (Prompt):** "Sitemizin ismi TazeSofra olsun. HTML, CSS ve JavaScript kullanarak yeşil ve parlak turuncu ağırlıklı bir arayüz yap. Favoriler ve filtreleme gibi kısımlar olsun, birkaç örnek tarif eklensin ve tariflerin üzerine gelince hover animasyonu olsun."
* **AI Çıktısı:** Sadece vejetaryenlere yönelik ve tüm kodların tek bir HTML dosyasında (inline) birleştirildiği temel bir yapı oluşturdu.
* **Benim Müdahalem:** Sistemin sadece vejetaryen değil, herkese hitap etmesi gerektiğine karar verdim. AI'a kodları VS Code'da modüler çalışabilmek için `index.html`, `style.css` ve `script.js` olarak 3 ayrı dosyaya bölmesi komutunu verdim. 

### Aşama 2: Etkileşim ve Dinamik Bileşenlerin Eklenmesi
* **Verilen Komut (Prompt):** "Tarife bastığımızda tarif detayları gözüksün. Siteye bir arama çubuğu ve yıldızlı puanlama sistemi ekleyelim."
* **AI Çıktısı:** Modal (açılır pencere) yapısını, arama çubuğunu ve 5 yıldızlı puanlama arayüzünü ekledi. Ancak filtreler ve favoriler hala statikti, gerçek veriyi filtrelemiyordu.
* **Benim Müdahalem:** Arayüzün sadece görsel olarak değil, işlevsel olarak da çalışmasını istedim. "Bir yemeği favorilere eklediğimizde Favoriler sekmesinde açılsın, filtrelemede hangisine basarsak o gelsin ve puanlama kısmında kaç kişinin puanladığı yazsın" diyerek JavaScript mantığını (logic) kurdurttum.

### Aşama 3: Optimizasyon ve Hata Ayıklama (Debugging)
* **Karşılaşılan Sorun:** Etli yemeğin (Antrikot) fotoğrafı web'den çekiliyordu (Unsplash URL). Kendi yerel bilgisayarımdaki bir fotoğrafı kullanmak istedim.
* **Çözüm:** AI'a görsel yolunu statik `images.jpg` olarak güncellemesini söyledim ve kendi görselimi projeye dahil ettim.
* **Karşılaşılan Sorun:** Yapay zeka bir aşamada kodların altına anlamsız bir metin/imza ekledi.
* **Çözüm:** Kodu gözden geçirirken bu hatayı tespit ettim, yapay zekayı uyararak gereksiz kısımların koddan temizlenmesini sağladım.

### Aşama 4: Sürüm Kontrolü ve Canlıya Alma (Deployment)
* Kodlar yerel ortamda test edilip son haline getirildikten sonra, `index.html`, `style.css`, `script.js`, görsel dosyası ve bu log dosyası modüler bir yapıda GitHub reposuna yüklendi.
* Proje yönetimini desteklemek amacıyla GitHub **Issues** sekmesi üzerinden "Gelecekte eklenecek özellikler" ve "Mobil uyumluluk" gibi görevler (Task) açıldı.
* Proje, **GitHub Pages** kullanılarak `main` branch üzerinden canlıya (deploy) alındı.

## Sonuç ve Kazanımlar
Yapay zeka doğrudan bitmiş bir proje vermek yerine, verilen spesifik komutlarla bir "kodlama partneri" olarak kullanılmıştır. Projenin mimarisi, klasör düzeni, görsel varlıkları ve versiyon kontrol (GitHub) aşamaları tamamen manuel olarak yönetilmiştir.


