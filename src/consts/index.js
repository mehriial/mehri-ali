export const books = [
    {
        id: 1,
        title: "Yazgı Paradoksu",
        subtitle:
            "❝Ruhunu yak, küllerini avuçlarında sakla. Kül kadar acımasız bu hayat, yandığını belli etmeden yakar seni.❞",
        description:
            "Anka Karas, babası Harun Karas'tan intikam almak için onun düşmanı olan Artel Dora Yarkın'a gider ve onunla iş birliği yapmasını ister. Birlikte çıktıkları yolda onları bekleyen çok şey vardır.",
        genres: [
            "Romantik",
            "Dram",
        ],
        status: "Devam ediyor",
        chapters: "18 bölüm",
        cover: "/img/yp.jpg",
        href: "/books/yazgi-paradoksu",
        series: {
            id: "verus",
            name: "Verus Serisi",
            order: 2,
        },
    },

    {
        id: 2,
        title: "Kanlı Hatıralar Portresi",
        subtitle:
            "❝Sorarsan eğer, kalbimin en ulaşılmaz noktasında duruyorsun. Çevrili dört bir yanın kanla; seni değil, anıları kirletiyor. Ve ben, hatıralara sıçramış kanla çiziyorum portreni.❞",
        description:
            "Maskeli bir baloda yabancı bir adamla dans eden Arina Gece Kanık, gece sonunda bir korkuyla yüzleşir. O geceden sonra almaya başladığı çiçeklerin sonu gelmezken, yirmi birinci çiçekte artık o kişinin dans ettiği adam olduğunu düşünerek tekrar o yabancının hayatına girer ve o günden sonra hayatı bir anda değişir.",
        genres: [
            "Romantik",
            "Dram",
            "Gizem",
        ],
        status: "Devam ediyor",
        chapters: "31 bölüm",
        cover: "/img/khp.jpg",
        href: "/books/kanli-hatiralar-portresi",
        series: {
            id: "verus",
            name: "Verus Serisi",
            order: 1,
        },
    },

    {
        id: 3,
        title: "Har",
        subtitle:
            "❝Adını sil, yaşının üzerini karala, kendini sev ya da sevme; bu dünya bir satranç tahtası, sen üzerindeki piyon.❞",
        description:
            "Uzel Hera Alaca, en yakın arkadaşı Hazer Kanıkor'un öldürülmesiyle onun abisi Kaner Kanıkor'un karşısına çıkar. Eski sevgilisine kardeşinin öldürüldüğünü söyleyerek ondan katili bulmasını isterken beraber bir yola çıkarlar.",
        genres: [
            "Dram",
            "Gizem",
        ],
        status: "Tamamlandı",
        chapters: "35 bölüm",
        cover: "/img/har.jpg",
        href: "/books/har",
        series: null,
    },
];


export const chapters = [
    // ==========================================
    // YAZGI PARADOKSU
    // ==========================================

    {
        id: 1,
        bookId: 1,
        order: 1,
        title: "Küllerin İçinde",
        date: "12 Ağustos 2026",
        content: `
            Gece, şehrin üzerine ağır ağır çökmüştü.

            Anka Karas, pencerenin önünde durmuş, karşısındaki karanlığa bakıyordu. Sokak lambalarının solgun ışığı odanın duvarlarına vuruyor, her şeyi olduğundan daha uzak gösteriyordu.

            Babasının adı aklına geldiğinde ellerini sıktı.

            Harun Karas.

            Yıllardır içinde büyüttüğü öfkenin tek bir nedeni vardı. Ve artık bu öfkeyi susturmak istemiyordu.

            Çünkü bazı yaralar iyileşmezdi.

            Bazıları yalnızca küle dönüşürdü.
        `,
    },

    {
        id: 2,
        bookId: 1,
        order: 2,
        title: "İlk Karşılaşma",
        date: "13 Ağustos 2026",
        content: `
            Artel Dora Yarkın'ı ilk gördüğünde, Anka onun hakkında duyduğu hiçbir şeyin abartı olmadığını anladı.

            Adam, odanın diğer ucunda sessizce duruyordu.

            Bakışları keskin, yüzündeki ifade ise neredeyse tamamen duygusuzdu.

            Anka birkaç saniye boyunca konuşmadı.

            Sonra derin bir nefes aldı.

            "Seninle bir anlaşma yapmak istiyorum."

            Artel başını hafifçe kaldırdı.

            "Ben anlaşma yapmam."

            "Bu sefer yapacaksın."
        `,
    },

    {
        id: 3,
        bookId: 1,
        order: 3,
        title: "Yazgının Başlangıcı",
        date: "14 Ağustos 2026",
        content: `
            Bazı kararların geri dönüşü yoktu.

            Anka bunu biliyordu.

            Yine de attığı her adım onu biraz daha karanlığın içine çekiyordu.

            Artel'in yanında yürürken artık kendi yolunun nerede bittiğini, onun yolunun nerede başladığını ayırt edemiyordu.
        `,
    },

    {
        id: 4,
        bookId: 1,
        order: 4,
        title: "Karanlıkta Kalanlar",
        date: "15 Ağustos 2026",
        content: `
            Geçmiş hiçbir zaman gerçekten geride kalmazdı.

            Sadece doğru zamanı beklerdi.

            Ve o gece, Anka geçmişinin kapısını bir daha kapanmamak üzere açtı.
        `,
    },


    // ==========================================
    // KANLI HATIRALAR PORTRESİ
    // ==========================================

    {
        id: 5,
        bookId: 2,
        order: 1,
        title: "Maskeli Balon",
        date: "10 Ağustos 2026",
        content: `
            Salonun içindeki müzik, kalabalığın uğultusuna karışıyordu.

            Arina Gece Kanık, maskesinin ardında kimsenin onu tanımayacağını düşünerek kalabalığın arasında ilerledi.

            O gece karşısına çıkacak adamdan henüz haberi yoktu.
        `,
    },

    {
        id: 6,
        bookId: 2,
        order: 2,
        title: "Yabancı",
        date: "11 Ağustos 2026",
        content: `
            Adam elini ona uzattığında Arina birkaç saniye tereddüt etti.

            Sonra elini onun eline bıraktı.

            Müzik başladı.

            Ve o gece tanımadığı bir yabancıyla yaptığı dans, hayatının geri kalanını değiştirecek ilk adım oldu.
        `,
    },

    {
        id: 7,
        bookId: 2,
        order: 3,
        title: "İlk Çiçek",
        date: "12 Ağustos 2026",
        content: `
            Kapının önündeki çiçeği gördüğünde uzun süre hareket edemedi.

            Kırmızı bir çiçekti.

            Yanında hiçbir not yoktu.

            Fakat Arina bunun sıradan bir çiçek olmadığını biliyordu.
        `,
    },


    // ==========================================
    // HAR
    // ==========================================

    {
        id: 8,
        bookId: 3,
        order: 1,
        title: "Hazer",
        date: "1 Temmuz 2026",
        content: `
            Telefon çaldığında Uzel Hera Alaca bunun kötü bir haber olduğunu henüz bilmiyordu.

            Fakat telefonu açtığı anda karşı taraftaki sessizlik her şeyi anlatmaya yetti.

            Hazer ölmüştü.

            Ve onun ölümünün ardında cevaplanması gereken çok fazla soru vardı.
        `,
    },

    {
        id: 9,
        bookId: 3,
        order: 2,
        title: "Kaner",
        date: "2 Temmuz 2026",
        content: `
            Kaner Kanıkor'un karşısına çıktığında Hera ne söyleyeceğini bilmiyordu.

            Tek bildiği, Hazer'in ölümünün basit bir cinayet olmadığıydı.

            "Kardeşini öldürdüler."

            Kaner'in yüzündeki ifade bir anda değişti.
        `,
    },

    {
        id: 10,
        bookId: 3,
        order: 3,
        title: "İlk Şüphe",
        date: "3 Temmuz 2026",
        content: `
            İlk şüphe ortaya çıktığında Hera artık geri dönüş olmadığını anladı.

            Birlikte araştırdıkları her şey onları başka bir isme götürüyordu.

            Ve o isim, düşündüklerinden çok daha yakındı.
        `,
    },
];