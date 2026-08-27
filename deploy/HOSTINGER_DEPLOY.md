# Hostinger Deployment Guide (Quickest path)

Bu rehber, Hostinger (VPS/Cloud) üzerinde en kısa yoldan çalışan bir Next.js uygulaması çalıştırmak için gereken adımları gösterir.

Özet: Docker + docker-compose ile uygulamayı konteyner olarak çalıştıracağız; Nginx konteyneri uygulamayı ters-proxy yapacak. SSL için Hostinger panelindeki Let's Encrypt entegrasyonunu kullanmanızı öneririm (en kolay yol).

Önkoşullar (Hostinger sunucuda):
- SSH erişimi (root veya sudo yetkili kullanıcı)
- Docker ve docker-compose kurulumu (aşağıdaki adımlarda kuruluyor)
- Domain (riskanaliz.com.tr) Hostinger DNS'inde sunucu IP'sine yönlenmiş olmalı

Adımlar (sunucu üzerinde):

1) Sunucuya SSH bağlanın

    ssh root@82.198.227.226

2) Docker ve docker-compose kur (Ubuntu/Debian örneği)

    apt update && apt install -y ca-certificates curl gnupg lsb-release
    mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    echo \"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable\" | tee /etc/apt/sources.list.d/docker.list > /dev/null
    apt update
    apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

    # veya apt ile docker-compose yüklüyse `apt install -y docker-compose` çalıştırın

3) Repo’yu klonlayın

    cd /var/www
    git clone https://github.com/korkutsendal-max/riskanaliz-site.git
    cd riskanaliz-site

4) Ortam değişkenlerini ayarlayın

    cp .env.example .env
    # .env içindeki SMTP ve EMAIL_TO değişkenlerini düzenleyin (evrak@riskanaliz.com.tr)

5) Docker Compose ile uygulamayı ayağa kaldırın

    docker compose up -d --build

6) (Opsiyonel) Hostinger panelinden veya LetsEncrypt ile SSL sağlayın

- Eğer Hostinger panelinde “SSL” varsa etkinleştirin (en kolay yol).
- Alternatif: Sunucuda certbot kullanıp sertifikayı alıp /etc/letsencrypt'i nginx containera mount edin.

Kontrol:
- Tarayıcıda https://riskanaliz.com.tr adresine gidin
- /apply sayfasını açıp test başvurusu gönderin; evrak@riskanaliz.com.tr adresine e-posta gelmeli (SMTP ayarları doğruysa)

Notlar / İpuçları:
- Hostinger paylaşılan hostingde (SSH yoksa) bu yöntem çalışmaz. Sunucunuzda Docker veya Node çalıştırma yeteneğiniz olduğundan emin olun.
- Dosya upload limitleri için formidable ayarlarını .env veya kod içinde kontrol edin.
- Eğer otomatik olarak sertifika almak isterseniz söyleyin, certbot tabanlı bir örnek ekleyebilirim.

