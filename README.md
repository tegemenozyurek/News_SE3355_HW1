# News API

Bu proje .NET 9.0 kullanılarak oluşturulmuş bir haber API'sidir.

## Render.com üzerinde Deployment

Bu API'yi Render.com üzerinde hostlamak için aşağıdaki adımları izleyin:

1. [Render.com](https://render.com/) üzerinde bir hesap oluşturun ve giriş yapın
2. Dashboard'da "New +" butonuna tıklayın ve "Web Service" seçin
3. GitHub/GitLab reponuzu bağlayın veya manuel olarak deploy edin
4. Aşağıdaki ayarları yapın:
   - Name: newsapi (veya istediğiniz bir isim)
   - Environment: Docker
   - Region: Size en yakın bölge
   - Branch: main (veya istediğiniz branch)
   - Build Command: `docker build -t newsapi .`
   - Start Command: `docker run -p 8080:8080 newsapi`
5. "Create Web Service" butonuna tıklayın

Alternatif olarak, bu repoda bulunan `render.yaml` dosyası ile "Blueprint" kullanarak otomatik deployment yapabilirsiniz.

## Veritabanı Hakkında

Bu API SQLite veritabanı kullanmaktadır ve `mydatabase.db` dosyasında veriler saklanır. Uygulama ilk çalıştığında, eğer veritabanında veri yoksa örnek haberler ve slider haberleri eklenir.

## API Endpointleri

- GET /api/News - Tüm haberleri getirir
- GET /api/SliderNews - Tüm slider haberlerini getirir

API dokümantasyonuna `/swagger` endpointi üzerinden erişebilirsiniz.
