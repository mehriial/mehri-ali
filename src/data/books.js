import ypImage from "@/assets/images/yp.jpg";
import khpImage from "@/assets/images/khp.jpg";
import harImage from "@/assets/images/har.jpg";
import anka from "@/assets/images/anka.jpg";
import dora from "@/assets/images/dora.jpg";
import turuncu from "@/assets/images/turuncu.jpg";
import kirmizi from "@/assets/images/kırmızı.jpg";

export const books = [
    {
        id: 1,
        title: "Yazgı Paradoksu",
        slug: "yazgi-paradoksu",
        author: "Mehri Ali",
        image: ypImage,
        category: "Gerilim",
        status: "Devam ediyor",
        series: "Verus Serisi",
        order: 2,
        description:
            "Bazı hikâyeler tesadüfen başlamaz. Bazı karşılaşmaların ardında, henüz keşfedilmemiş bir yazgı vardır.",
        featured: true,

        chapters: [
            {
                id: 1,
                number: 1,
                title: "Başlangıç",
                publishedAt: "12 Ağustos 2026",
                content: [
                    "Bazı hikâyeler bir kapının açılmasıyla başlamaz. Bazen yalnızca bir bakış yeterlidir.",
                    "O gece şehir her zamankinden daha sessizdi. Sokak lambalarının solgun ışığı kaldırım taşlarına vuruyor, rüzgâr boş sokaklarda dolaşıyordu.",
                    "Mehri, pencerenin önünde durmuş dışarıyı izliyordu. İçinde açıklayamadığı bir huzursuzluk vardı.",
                    "Telefonunun ekranı bir kez daha yandı.",
                    "Bilinmeyen Numara.",
                    "Mesajı açmadan önce birkaç saniye bekledi. Sonunda parmağı ekrana dokundu.",
                    "Bazı şeyleri öğrenmek için çok geç kaldın.",
                    "Kalbi hızlandı.",
                    "Mesajın altında başka hiçbir şey yoktu."
                ],
            },
            {
                id: 2,
                number: 2,
                title: "İlk İz",
                publishedAt: "19 Ağustos 2026",
                content: [
                    "Ertesi sabah şehir aynı görünüyordu.",
                    "Ama Mehri için hiçbir şey aynı değildi.",
                    "Gece boyunca gelen mesajı düşünmüş, kelimelerin ardında ne saklandığını anlamaya çalışmıştı.",
                    "Masasının üzerinde duran eski fotoğraf gözüne ilişti.",
                    "Fotoğrafı eline aldığında arkasında daha önce fark etmediği bir tarih gördü.",
                    "28 Ekim.",
                    "Bu yalnızca bir tesadüf olamazdı."
                ],
            },
            {
                id: 3,
                number: 3,
                title: "Sessiz Tanık",
                publishedAt: "26 Ağustos 2026",
                content: [
                    "Kapının önünde duran adam tek kelime etmedi.",
                    "Sadece elindeki dosyayı uzattı.",
                    "Mehri dosyayı açtığında ilk sayfada kendi adını gördü.",
                    "O anda geçmişin sandığından çok daha yakın olduğunu anladı."
                ],
            },
        ],
        characters: [
            {
                id: 1,
                name: "Anka Karas",
                role: "Ana karakter",
                description: "Karakter hakkında kısa bir açıklama.",
                image: anka,
            },
            {
                id: 2,
                name: "Artel Dora Yarkin",
                role: "Ana karakter",
                description: "Karakter hakkında kısa bir açıklama.",
                image: dora,
            },
        ],
        gallery: [
            {
                id: 1,
                image: anka,
                alt: "Yazgı Paradoksu",
            },
            {
                id: 2,
                image: dora,
                alt: "Yazgı Paradoksu",
            },
            {
                id: 3,
                image: '/images/yp1.jpg',
                alt: "Yazgı Paradoksu",
            },
            {
                id: 4,
                image: '/images/yp2.jpg',
                alt: "Yazgı Paradoksu",
            },
            {
                id: 5,
                image: '/images/yp3.jpg',
                alt: "Yazgı Paradoksu",
            },
            {
                id: 6,
                image: '/images/yp4.jpg',
                alt: "Yazgı Paradoksu",
            },
            {
                id: 7,
                image: '/images/yp5.jpg',
                alt: "Yazgı Paradoksu",
            },


        ],

        theme: {
            background: "#080808",
            accent: "#500209",
            muted: "#999999",
        },
    },
    {
        id: 2,
        title: "Kanlı Hatıralar Portresi",
        slug: "kanli-hatiralar-portresi",
        author: "Mehri Ali",
        image: khpImage,
        category: "Gerilim",
        status: "Devam ediyor",
        series: "Verus Serisi",
        order: 1,
        description:
            "Bazı hikâyeler tesadüfen başlamaz. Bazı karşılaşmaların ardında, henüz keşfedilmemiş bir yazgı vardır.",
        featured: true,
    },
    {
        id: 3,
        title: "Har",
        slug: "har",
        author: "Mehri Ali",
        image: harImage,
        description:
            "Uzel Hera Alaca, en yakın arkadaşı Hazer Kanıkor'un öldürülmesiyle onun abisi Kaner Kanıkor'un karşısına çıkar. Eski sevgilisine kardeşinin öldürüldüğünü söyleyerek ondan katili bulmasını isterken beraber bir yola çıkarlar.",
        featured: true,
        status: "Tamamlandı",
        category: "Gerilim",
    },
    {
        id: 4,
        title: "Beyaz Işık Kırıntısı Kırmızı",
        slug: "beyaz-isik-kirintisi-kirmizi",
        author: "Mehri Ali",
        image: kirmizi,
        category: "Romantik",
        status: "Tamamlandı",
        series: "Beyaz Işık Kırıntısı",
        order: 1,
        description:
            "test.",
        featured: true,
        chapters: [
            {
                id: 1,
                number: 1,
                title: "Başlangıç",
                publishedAt: "12 Ağustos 2026",
                content: [
                    "Bazı hikâyeler bir kapının açılmasıyla başlamaz. Bazen yalnızca bir bakış yeterlidir.",
                    "O gece şehir her zamankinden daha sessizdi. Sokak lambalarının solgun ışığı kaldırım taşlarına vuruyor, rüzgâr boş sokaklarda dolaşıyordu.",
                    "Mehri, pencerenin önünde durmuş dışarıyı izliyordu. İçinde açıklayamadığı bir huzursuzluk vardı.",
                    "Telefonunun ekranı bir kez daha yandı.",
                    "Bilinmeyen Numara.",
                    "Mesajı açmadan önce birkaç saniye bekledi. Sonunda parmağı ekrana dokundu.",
                    "Bazı şeyleri öğrenmek için çok geç kaldın.",
                    "Kalbi hızlandı.",
                    "Mesajın altında başka hiçbir şey yoktu."
                ],
            },
            {
                id: 2,
                number: 2,
                title: "İlk İz",
                publishedAt: "19 Ağustos 2026",
                content: [
                    "Ertesi sabah şehir aynı görünüyordu.",
                    "Ama Mehri için hiçbir şey aynı değildi.",
                    "Gece boyunca gelen mesajı düşünmüş, kelimelerin ardında ne saklandığını anlamaya çalışmıştı.",
                    "Masasının üzerinde duran eski fotoğraf gözüne ilişti.",
                    "Fotoğrafı eline aldığında arkasında daha önce fark etmediği bir tarih gördü.",
                    "28 Ekim.",
                    "Bu yalnızca bir tesadüf olamazdı."
                ],
            },
            {
                id: 3,
                number: 3,
                title: "Sessiz Tanık",
                publishedAt: "26 Ağustos 2026",
                content: [
                    "Kapının önünde duran adam tek kelime etmedi.",
                    "Sadece elindeki dosyayı uzattı.",
                    "Mehri dosyayı açtığında ilk sayfada kendi adını gördü.",
                    "O anda geçmişin sandığından çok daha yakın olduğunu anladı."
                ],
            },
        ],
        characters: [
            {
                id: 1,
                name: "Anka Karas",
                role: "Ana karakter",
                description: "Karakter hakkında kısa bir açıklama.",
                image: anka,
            },
            {
                id: 2,
                name: "Artel Dora Yarkin",
                role: "Ana karakter",
                description: "Karakter hakkında kısa bir açıklama.",
                image: dora,
            },
        ],
        gallery: [
            {
                id: 1,
                image: anka,
                alt: "Yazgı Paradoksu",
            },
            {
                id: 2,
                image: dora,
                alt: "Yazgı Paradoksu",
            },
            {
                id: 3,
                image: '/images/yp1.jpg',
                alt: "Yazgı Paradoksu",
            },
            {
                id: 4,
                image: '/images/yp2.jpg',
                alt: "Yazgı Paradoksu",
            },
            {
                id: 5,
                image: '/images/yp3.jpg',
                alt: "Yazgı Paradoksu",
            },
            {
                id: 6,
                image: '/images/yp4.jpg',
                alt: "Yazgı Paradoksu",
            },
            {
                id: 7,
                image: '/images/yp5.jpg',
                alt: "Yazgı Paradoksu",
            },


        ],

        theme: {
            background: "#4a0505",
            accent: "#b5b2b2",
            muted: "#999999",
        },
    },
    {
        id: 5,
        title: "Beyaz Işık Kırıntısı Turuncu",
        slug: "beyaz-isik-kirintisi-turuncu",
        author: "Mehri Ali",
        image: turuncu,
        category: "Romantik",
        status: "Tamamlandı",
        series: "Beyaz Işık Kırıntısı",
        order: 1,
        description:
            "test.",
        featured: true,
        chapters: [
            {
                id: 1,
                number: 1,
                title: "Başlangıç",
                publishedAt: "12 Ağustos 2026",
                content: [
                    "Bazı hikâyeler bir kapının açılmasıyla başlamaz. Bazen yalnızca bir bakış yeterlidir.",
                    "O gece şehir her zamankinden daha sessizdi. Sokak lambalarının solgun ışığı kaldırım taşlarına vuruyor, rüzgâr boş sokaklarda dolaşıyordu.",
                    "Mehri, pencerenin önünde durmuş dışarıyı izliyordu. İçinde açıklayamadığı bir huzursuzluk vardı.",
                    "Telefonunun ekranı bir kez daha yandı.",
                    "Bilinmeyen Numara.",
                    "Mesajı açmadan önce birkaç saniye bekledi. Sonunda parmağı ekrana dokundu.",
                    "Bazı şeyleri öğrenmek için çok geç kaldın.",
                    "Kalbi hızlandı.",
                    "Mesajın altında başka hiçbir şey yoktu."
                ],
            },
            {
                id: 2,
                number: 2,
                title: "İlk İz",
                publishedAt: "19 Ağustos 2026",
                content: [
                    "Ertesi sabah şehir aynı görünüyordu.",
                    "Ama Mehri için hiçbir şey aynı değildi.",
                    "Gece boyunca gelen mesajı düşünmüş, kelimelerin ardında ne saklandığını anlamaya çalışmıştı.",
                    "Masasının üzerinde duran eski fotoğraf gözüne ilişti.",
                    "Fotoğrafı eline aldığında arkasında daha önce fark etmediği bir tarih gördü.",
                    "28 Ekim.",
                    "Bu yalnızca bir tesadüf olamazdı."
                ],
            },
            {
                id: 3,
                number: 3,
                title: "Sessiz Tanık",
                publishedAt: "26 Ağustos 2026",
                content: [
                    "Kapının önünde duran adam tek kelime etmedi.",
                    "Sadece elindeki dosyayı uzattı.",
                    "Mehri dosyayı açtığında ilk sayfada kendi adını gördü.",
                    "O anda geçmişin sandığından çok daha yakın olduğunu anladı."
                ],
            },
        ],
        characters: [
            {
                id: 1,
                name: "Anka Karas",
                role: "Ana karakter",
                description: "Karakter hakkında kısa bir açıklama.",
                image: anka,
            },
            {
                id: 2,
                name: "Artel Dora Yarkin",
                role: "Ana karakter",
                description: "Karakter hakkında kısa bir açıklama.",
                image: dora,
            },
        ],
        gallery: [
            {
                id: 1,
                image: anka,
                alt: "Yazgı Paradoksu",
            },
            {
                id: 2,
                image: dora,
                alt: "Yazgı Paradoksu",
            },
            {
                id: 3,
                image: '/images/yp1.jpg',
                alt: "Yazgı Paradoksu",
            },
            {
                id: 4,
                image: '/images/yp2.jpg',
                alt: "Yazgı Paradoksu",
            },
            {
                id: 5,
                image: '/images/yp3.jpg',
                alt: "Yazgı Paradoksu",
            },
            {
                id: 6,
                image: '/images/yp4.jpg',
                alt: "Yazgı Paradoksu",
            },
            {
                id: 7,
                image: '/images/yp5.jpg',
                alt: "Yazgı Paradoksu",
            },


        ],

        theme: {
            background: "#9e4b09",
            accent: "#b5b2b2",
            muted: "#999999",
        },
    },

];