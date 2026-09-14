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
import AdminLayout from "@/components/layout/AdminLayout.jsx";
import AdminDashboard from "@/pages/admin/dashboard/index.jsx";
import BooksPage from "@/pages/admin/books/index.jsx";
import AdminChapters from "@/pages/admin/chapters/index.jsx";
import AdminGallery from "@/pages/admin/gallery/index.jsx";
import GalleryEditsPage from "@/pages/admin/gallery-edits/index.jsx";
import BoardAdminPage from "@/pages/admin/board/index.jsx";
import AnnouncementsAdminPage from "@/pages/admin/announcements/index.jsx";
import UsersAdminPage from "@/pages/admin/users/index.jsx";

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

                <Route path="/board" element={<Board />} />

                <Route path="/gallery" element={<Gallery />} />

                <Route
                    path="/announcements"
                    element={<Announcements />}
                />

                <Route
                    path="/profile/:username"
                    element={<Profile />}
                />
            </Route>

            <Route
                path="/books/:slug/read/:chapter"
                element={<Reader />}
            />

            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path='books' element={<BooksPage />} />
                <Route path='chapters' element={<AdminChapters />} />
                <Route path='gallery' element={<AdminGallery />} />
                <Route
                    path="gallery/edits"
                    element={<GalleryEditsPage />}
                />
                <Route
                    path="board"
                    element={<BoardAdminPage />}
                />
                <Route
                    path="announcements"
                    element={<AnnouncementsAdminPage />}
                />
                <Route
                    path="users"
                    element={<UsersAdminPage />}
                />
            </Route>
        </Routes>
    );
}

export default AppRoutes;