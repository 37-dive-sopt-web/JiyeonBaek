import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignupPage";
import { MyPage } from "../pages/MyPage";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/mypage"
          element={<Navigate to="/mypage/myinfo" replace />}
        />
        <Route path="/mypage/myinfo" element={<MyPage />} />
        <Route path="/mypage/members" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
