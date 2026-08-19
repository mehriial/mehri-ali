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

                {/*<Route path="books" element={<AdminBooks />} />*/}
                {/*<Route path="chapters" element={<AdminChapters />} />*/}
                {/*<Route path="comments" element={<AdminComments />} />*/}
                {/*<Route path="board" element={<AdminBoard />} />*/}
                {/*<Route path="announcements" element={<AdminAnnouncements />} />*/}
                {/*<Route path="messages" element={<AdminMessages />} />*/}
                {/*<Route path="settings" element={<AdminSettings />} />*/}
            </Route>
        </Routes>
    );
}

export default App;