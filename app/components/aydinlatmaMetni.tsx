import React from "react";
import { Dialog } from "primereact/dialog";

interface AydinlatmaMetniDialogProps {
  visible: boolean;
  onHide: () => void;
}

const AydinlatmaMetniDialog: React.FC<AydinlatmaMetniDialogProps> = ({
  visible,
  onHide,
}) => {
  return (
    <Dialog
      header="Üye ve Ziyaretçi Kişisel Veri Aydınlatma Metni"
      visible={visible}
      onHide={onHide}
      modal
      style={{ width: "80vw", maxWidth: "900px" }}
      contentStyle={{
        maxHeight: "70vh",
        overflowY: "auto",
        paddingRight: "1rem",
      }}
    >
      <div style={{ textAlign: "justify", lineHeight: "1.6" }}>
        <p>
          Sayın Müşterilerimiz, Potansiyel Müşterilerimiz ve Web Sitesi
          Ziyaretçilerimiz, ("Şirket") olarak kişisel verilerinizin korunmasına
          büyük önem veriyoruz. Bu kapsamda 6698 sayılı Kişisel Verilerin
          Korunması Kanunu ("KVKK”) uyarınca "veri sorumlusu” sıfatıyla kişisel
          verileriniz ve işleme süreçleri hakkında sizleri bilgilendirmek
          isteriz.
        </p>

        <h5>İşlenen Kişisel Verileriniz Nelerdir</h5>
        <ul>
          <li>Kimlik bilgileriniz (Ad Soyad, Doğum tarihi, TC Kimlik No)</li>
          <li>
            İletişim bilgileriniz (Adres, e-posta adresi, telefon numarası)
          </li>
          <li>Site kullanımlarınıza ilişkin detaylar</li>
          <li>Kullanıcı adı ve şifreniz</li>
          <li>Şirket bilginiz (ad, adres, telefon)</li>
          <li>Fatura, ödeme, banka ve kredi kartı bilgileri (duruma göre)</li>
          <li>Talep ve şikayet kayıtları</li>
          <li>Müşterilerinize ait sistem verileri (sadece saklama amaçlı)</li>
        </ul>

        <h5>Elektronik Ticari İletişim İzni Vermeniz Durumunda</h5>
        <ul>
          <li>Kimlik ve iletişim bilgileri</li>
          <li>Site davranışları ve işlem detayları</li>
          <li>
            Alışveriş alışkanlıkları, tercihler, kampanya ve anket verileri
          </li>
          <li>Tanımlama bilgileri (çerez, IP, web tarayıcı bilgileri vb.)</li>
        </ul>

        <h5>Kişisel Verilerinizin İşlenme Amaçları</h5>
        <ul>
          <li>İletişim kurulması ve şikayetlerin çözülmesi</li>
          <li>Yasal yükümlülüklerin yerine getirilmesi</li>
          <li>Satış sonrası hizmetlerin sunulması</li>
          <li>Faturalama ve ödeme işlemlerinin gerçekleştirilmesi</li>
          <li>Kullanıcı memnuniyetinin sağlanması ve hizmet geliştirme</li>
        </ul>

        <h5>Kişisel Verilerinizin Toplanma Yöntemi ve Hukuki Sebebi</h5>
        <p>
          Kişisel verileriniz; site üzerindeki işlemleriniz, alışverişleriniz,
          şikayet ve talepleriniz, anket doldurma, kampanyalara katılım gibi
          yöntemlerle, otomatik veya yarı otomatik sistemlerle ve açık rıza
          hukuki sebebine dayalı olarak toplanmaktadır.
        </p>

        <h5>Kişisel Verilerinizin Aktarılması</h5>
        <p>
          Verileriniz; hizmet aldığımız yurtiçi/yurtdışı iş ortaklarımız, çağrı
          merkezleri, pazarlama şirketleri, ödeme sistemleri sağlayıcıları,
          resmi kurum ve kuruluşlara yasal zorunluluklar çerçevesinde
          aktarılabilmektedir.
        </p>

        <h5>Haklarınız</h5>
        <ul>
          <li>Verilerinizin işlenip işlenmediğini öğrenme</li>
          <li>İşlenmişse bilgi talep etme</li>
          <li>Amacına uygun kullanılıp kullanılmadığını öğrenme</li>
          <li>Üçüncü kişileri öğrenme</li>
          <li>Eksik/yanlış işlenmişse düzeltilmesini isteme</li>
          <li>Silinmesini/yok edilmesini talep etme</li>
          <li>İtiraz etme</li>
          <li>Zararınız varsa tazminini isteme</li>
        </ul>

        <h5>İletişim</h5>
        <p>
          Başvurularınızı, sistemdeki e-posta adresiniz üzerinden veya yazılı
          olarak aşağıda belirtilen adrese iletebilirsiniz.
        </p>
        <p>
          <strong>Adres:</strong>
          <br />
          <strong>Telefon:</strong>
        </p>
      </div>
    </Dialog>
  );
};

export default AydinlatmaMetniDialog;
