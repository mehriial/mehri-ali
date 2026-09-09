import ypGallery1 from "/images/yp1.jpg";
import ypGallery2 from "/images/yp2.jpg";
import ypGallery3 from "/images/yp3.jpg";
import ypGallery4 from "/images/yp4.jpg";


import { books } from "./books.js";


// Galeri filtresinde kullanılacak kitaplar
export const galleryBooks = books.map((book) => ({
    id: book.id,
    title: book.title,
    slug: book.slug,
}));


// Edit gönderirken kullanılacak kitaplar
export const editBooks = books.map((book) => ({
    id: book.id,
    title: book.title,
    slug: book.slug,
}));


// Galeri görselleri
export const initialGalleryItems = [
    {
        id: 1,
        bookSlug: "yazgi-paradoksu",
        type: "photo",
        image: ypGallery1,
        title: "Yazgı Paradoksu",
        username: "Mehri",
        status: "approved",
        isMine: false,
        createdAt: "12 Ağustos 2026",
    },
    {
        id: 2,
        bookSlug: "yazgi-paradoksu",
        type: "photo",
        image: ypGallery2,
        title: "Yazgı Paradoksu",
        username: "Mehri",
        status: "approved",
        isMine: false,
        createdAt: "10 Ağustos 2026",
    },
    {
        id: 3,
        bookSlug: "yazgi-paradoksu",
        type: "photo",
        image: ypGallery3,
        title: "Yazgı Paradoksu",
        username: "Mehri",
        status: "approved",
        isMine: false,
        createdAt: "8 Ağustos 2026",
    },
    {
        id: 4,
        bookSlug: "yazgi-paradoksu",
        type: "photo",
        image: ypGallery4,
        title: "Yazgı Paradoksu",
        username: "Mehri",
        status: "approved",
        isMine: false,
        createdAt: "5 Ağustos 2026",
    },
];