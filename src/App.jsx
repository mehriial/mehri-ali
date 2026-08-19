import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout.jsx";
import Home from "./pages/home/index.jsx";
import Books from "./pages/books/index.jsx";
import BookDetails from "./pages/books-details/index.jsx";
import BookChapters from "./pages/book-chapters/index.jsx";
import ChapterReader from "./pages/chapter-reader/index.jsx";
import Notes from "./pages/notes/index.jsx";
import Board from "./pages/board/index.jsx";
import Announcements from "./pages/announcements/index.jsx";
import Contact from "./pages/contact/index.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminBooks from "./pages/admin/AdminBooks.jsx";
import AdminBookForm from "./pages/admin/AdminBookForm.jsx";
import Chapters from "./pages/admin/Chapters.jsx";
import Comments from "./pages/admin/Comments.jsx";
import AdminAnnouncements from "./pages/admin/Announcements.jsx";
import AdminBoard from "./pages/admin/Board.jsx";
import AdminNotes from "./pages/admin/Notes.jsx";
import AdminContact from "./pages/admin/Contact.jsx";
import Settings from "./pages/admin/Settings.jsx";
import ChapterForm from "./pages/admin/ChapterForm.jsx";



function App() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<Books />} />
                <Route path="/books/:id" element={<BookDetails />} />
                <Route
                    path="/books/:id/chapters"
                    element={<BookChapters />}
                />
                <Route
                    path="/books/:id/chapters/:chapterId"
                    element={<ChapterReader />}
                />
                <Route path="/notes" element={<Notes />} />
                <Route path="/board" element={<Board />} />

                <Route
                    path="/announcements"
                    element={<Announcements />}
                />
                <Route path="/contact" element={<Contact />} />
            </Route>
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />

                <Route path="books" element={<AdminBooks />} />
                <Route path="books/create" element={<AdminBookForm />} />
                <Route path="books/:id/edit" element={<AdminBookForm />} />

                <Route path="/admin/chapters" element={<Chapters />} />
                <Route path="/admin/comments" element={<Comments />} />
                <Route path="/admin/board" element={<AdminBoard />} />
                <Route path="/admin/notes" element={<AdminNotes />} />
                <Route path="/admin/announcements" element={<AdminAnnouncements />} />
                <Route path="/admin/contact" element={<AdminContact />} />

                <Route
                    path="/admin/chapters/create"
                    element={<ChapterForm />}
                />

                <Route
                    path="/admin/chapters/:id/edit"
                    element={<ChapterForm />}
                />
                <Route path="/admin/settings" element={<Settings />} />
            </Route>
        </Routes>
    );
}

export default App;