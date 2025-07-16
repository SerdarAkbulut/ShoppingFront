"use client";
import { Dialog } from "primereact/dialog";
import React from "react";

type Props = {
  visible: boolean;
  setVisible: (v: boolean) => void;
};

const UyelikSozlesmesi = ({ visible, setVisible }: Props) => {
  return (
    <Dialog
      header="Üyelik Sözleşmesi"
      visible={visible}
      style={{ width: "auto", maxWidth: "50vw" }}
      onHide={() => setVisible(false)}
      modal
      className="p-4"
    >
      <div className="prose max-w-none text-sm text-justify overflow-y-auto max-h-[70vh]">
        <h2 className="font-bold underline text-lg">ÜYELİK SÖZLEŞMESİ</h2>
        <p>
          Lütfen sitemizi kullanmadan evvel bu ‘site kullanım şartları’nı
          dikkatlice okuyunuz. Bu alışveriş sitesini kullanan ve alışveriş yapan
          müşterilerimiz aşağıdaki şartları kabul etmiş varsayılmaktadır:
        </p>
        <p>
          <strong>
            İNDİRİMLİ, KİŞİYE ÖZEL HAZIRLANAN ÜRÜNLER VE AKSESUARLAR (gözlük,
            kartlık, çanta, şal ve eşarp) DEĞİŞİM-İADE YOKTUR.
          </strong>
        </p>

        <p>
          Sitemizdeki web sayfaları ve ona bağlı tüm sayfalar (‘site’) ………………………
          adresindeki ………………………………. firmasına (‘Firma) aittir ve onun tarafından
          işletilir. Sizler (‘Kullanıcı’) sitede sunulan tüm hizmetleri
          kullanırken aşağıdaki şartlara tabi olduğunuzu, sitedeki hizmetten
          yararlanmakla ve kullanmaya devam etmekle; yasalara göre sözleşme
          imzalama hakkına sahip olduğunuzu, bu sözleşmeyi okuduğunuzu,
          anladığınızı ve şartları kabul ettiğinizi beyan etmiş sayılırsınız.
        </p>

        <h3 className="font-bold underline mt-4">1. SORUMLULUKLAR</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Firma, fiyatlar ve sunulan ürün ve hizmetler üzerinde değişiklik
            yapma hakkını saklı tutar.
          </li>
          <li>
            Firma, hizmetleri teknik arıza haricinde sunacağını taahhüt eder.
          </li>
          <li>
            Kullanıcı, tersine mühendislik gibi işlemler yapmayacağını ve aksi
            durumda doğacak zararlardan sorumlu olacağını kabul eder.
          </li>
          <li>
            Yanlış bilgi verilmesi ve sözleşmenin ihlali durumunda firma,
            üyeliği tek taraflı sonlandırabilir.
          </li>
          <li>
            Kullanıcıya ait erişim bilgileri (IP, tarih, vb.) yasal mevzuat
            gereği toplanabilir.
          </li>
          <li>
            Kullanıcı; ahlaka aykırı, yasa dışı, telif hakkı ihlali gibi
            içerikler paylaşamaz, aksi durumda sorumluluğu kabul eder.
          </li>
          <li>
            Üyelerin birbirleri veya üçüncü kişilerle olan ilişkileri kendi
            sorumluluğundadır.
          </li>
        </ul>

        <h3 className="font-bold underline mt-4">2. FİKRİ MÜLKİYET HAKLARI</h3>
        <p>
          Sitedeki tüm içerikler firmaya veya ilgilisine aittir. İzinsiz
          kopyalanamaz, dağıtılamaz. İhlal durumunda kullanıcı yasal sorumluluğu
          kabul eder.
        </p>

        <h3 className="font-bold underline mt-4">3. GİZLİ BİLGİ</h3>
        <p>
          Firma, kişisel bilgileri 3. şahıslarla paylaşmaz. Kullanıcı, tanıtım
          vb. iletişimler için onay verebilir ve bu onayı sonradan iptal etme
          hakkına sahiptir.
        </p>

        <h3 className="font-bold underline mt-4">4. GARANTİ VERMEME</h3>
        <p>
          Firma hizmetleri “olduğu gibi” sunar. Açık ya da zımni hiçbir garanti
          vermemektedir.
        </p>

        <h3 className="font-bold underline mt-4">5. KAYIT VE GÜVENLİK</h3>
        <p>
          Kullanıcı doğru bilgi vermekle yükümlüdür. Şifre ve hesap güvenliği
          kendisine aittir.
        </p>

        <h3 className="font-bold underline mt-4">6. MÜCBİR SEBEP</h3>
        <p>
          Doğal afet, savaş, internet kesintisi gibi mücbir sebepler nedeniyle
          sorumluluk askıya alınır.
        </p>

        <h3 className="font-bold underline mt-4">7. YÜRÜRLÜLÜK</h3>
        <p>
          Bu sözleşme taraflarca onaylandığı andan itibaren geçerli olur ve
          süreklidir.
        </p>

        <h3 className="font-bold underline mt-4">8. YETKİLİ MAHKEME</h3>
        <p>
          Her türlü anlaşmazlık durumunda İstanbul Merkez Mahkemeleri
          yetkilidir.
        </p>
      </div>
    </Dialog>
  );
};

export default UyelikSozlesmesi;
