import { lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout.jsx";
import PageLoader from "./components/ui/PageLoader.jsx";
import { useAuth } from "./context/AuthContext.jsx";

const Home = lazy(() => import("./pages/home/index.jsx"));
const Books = lazy(() => import("./pages/books/index.jsx"));
const BookDetails = lazy(() => import("./pages/books-details/index.jsx"));
const BookChapters = lazy(() => import("./pages/book-chapters/index.jsx"));
const ChapterReader = lazy(() => import("./pages/chapter-reader/index.jsx"));
const Notes = lazy(() => import("./pages/notes/index.jsx"));
const Board = lazy(() => import("./pages/board/index.jsx"));
const Announcements = lazy(() => import("./pages/announcements/index.jsx"));
const Contact = lazy(() => import("./pages/contact/index.jsx"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout.jsx"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.jsx"));
const AdminBooks = lazy(() => import("./pages/admin/AdminBooks.jsx"));
const AdminBookForm = lazy(() => import("./pages/admin/AdminBookForm.jsx"));
const Chapters = lazy(() => import("./pages/admin/Chapters.jsx"));
const Comments = lazy(() => import("./pages/admin/Comments.jsx"));
const AdminAnnouncements = lazy(() => import("./pages/admin/Announcements.jsx"));
const AdminBoard = lazy(() => import("./pages/admin/Board.jsx"));
const AdminNotes = lazy(() => import("./pages/admin/Notes.jsx"));
const AdminContact = lazy(() => import("./pages/admin/Contact.jsx"));
const Settings = lazy(() => import("./pages/admin/Settings.jsx"));
const ChapterForm = lazy(() => import("./pages/admin/ChapterForm.jsx"));

function AdminGuard({ children }) {
    const { user } = useAuth();
    const location = useLocation();
    if (!user) return <Navigate to="/" replace state={{ authRequired: true, from: location.pathname }} />;
    if (user.role !== "admin") return <Navigate to="/" replace state={{ accessDenied: true }} />;
    return children;
}

function App() {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/books" element={<Books />} />
                    <Route path="/books/:id" element={<BookDetails />} />
                    <Route path="/books/:id/chapters" element={<BookChapters />} />
                    <Route path="/books/:id/chapters/:chapterId" element={<ChapterReader />} />
                    <Route path="/notes" element={<Notes />} />
                    <Route path="/board" element={<Board />} />
                    <Route path="/announcements" element={<Announcements />} />
                    <Route path="/contact" element={<Contact />} />
                </Route>
                <Route path="/admin" element={<AdminGuard><AdminLayout /></AdminGuard>}>
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
        </Suspense>
    );
}

export default App;
