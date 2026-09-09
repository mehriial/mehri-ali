import { Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/main-layout/MainLayout.jsx";
import Home from "@/pages/home/index.jsx";
import Books from "@/pages/books/index.jsx";
import BookDetail from "@/pages/book-detail/index.jsx";
import Reader from "@/pages/reader/index.jsx";
import Board from "@/pages/board/index.jsx";
import Gallery from "@/pages/gallery/index.jsx";
import Announcements from "@/pages/announcements/index.jsx";
import Profile from "@/pages/profile/index.jsx";

function AppRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />

                <Route path="/books" element={<Books />} />

                <Route
                    path="/books/:slug"
                    element={<BookDetail />}
                />

                <Route
                    path="/books/:slug/read/:chapter"
                    element={<Reader />}
                />

                <Route path="/board" element={<Board />} />

                <Route path="/gallery" element={<Gallery />} />

                <Route
                    path="/announcements.js"
                    element={<Announcements />}
                />

                <Route
                    path="/profile/:username"
                    element={<Profile />}
                />
            </Route>
        </Routes>
    );
}

export default AppRoutes;