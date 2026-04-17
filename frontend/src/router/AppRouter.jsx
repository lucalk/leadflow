import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import AdminRequests from "../pages/AdminRequests";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRouter() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin/requests" element={<ProtectedRoute><AdminRequests /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    )
}