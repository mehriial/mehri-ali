export const initialBoardPosts = [
    {
        id: 1,
        username: "Mehri",
        type: "text",
        text: "Yeni bölüm üzerinde çalışıyorum. Bazı hikâyeler gerçekten anlatılmak için sabırsızlanıyor.",
        image: null,
        status: "approved",
        createdAt: "2 saat önce",
        isMine: false,
        comments: [
            {
                id: 101,
                username: "Lina",
                text: "Yeni bölümü sabırsızlıkla bekliyorum.",
                createdAt: "1 saat önce",
                isMine: false,
                replies: [
                    {
                        id: 102,
                        username: "Mehri",
                        text: "Çok yakında. 🤍",
                        createdAt: "45 dakika önce",
                        isMine: true,
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        username: "Elif",
        type: "text",
        text: "Yazarken arka planda dinlediğiniz şarkılar var mı? Özellikle gerilim yazarken playlist önerilerinizi bekliyorum.",
        image: null,
        status: "approved",
        createdAt: "5 saat önce",
        isMine: false,
        comments: [],
    },
];