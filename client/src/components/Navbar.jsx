
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";

const memoraColors = {
  pageBg: "#B69BCF",
  cardBg: "#EEDFF7",
  primary: "#4C1B6F",
  inputBg: "#FFFFFF",
  placeholder: "#D0C2DE",
  textMain: "#3B2349",
  textMuted: "#8A7A9A",
  linkBlue: "#2F6FD8",
};

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleAboutClick = (e) => {
    // لو نحن في صفحة غير الصفحة الرئيسية، نوجّه أولًا للـ /
    if (location.pathname !== "/") {
      e.preventDefault();
      navigate("/#why-memora");
    }
    // لو نحن أصلاً في /، يمكن لاحقًا نضيف scroll إلى العنصر بالسماعات (optional)
  };

  return (
    <nav
      className="d-flex justify-content-between align-items-center px-4 py-3"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Logo / Brand */}
      <Link
        to="/"
        className="text-decoration-none"
        style={{ display: "flex", alignItems: "center" }}
      >
        <span
          style={{
            fontSize: "1.6rem",
            color: memoraColors.primary,
            fontFamily: "'Fredoka One', sans-serif",
            fontWeight: 700,
          }}
        >
          Memora
        </span>
      </Link>

      {/* Links */}
      <div className="d-flex align-items-center gap-4">
        <Link
          to="/"
          className="text-decoration-none"
          style={{ color: memoraColors.primary }}
        >
          Home
        </Link>

        <Link
          to="/#why-memora"
          className="text-decoration-none"
          style={{ color: memoraColors.primary }}
          onClick={handleAboutClick}
        >
          About Us
        </Link>

        <Link
          to="/contact"
          className="text-decoration-none"
          style={{ color: memoraColors.primary }}
        >
          Contact
        </Link>

        {/* لو المستخدم مسجل دخول */}
        {user ? (
          <>
            <span
              style={{
                color: memoraColors.textMuted,
                fontSize: "0.9rem",
              }}
            >
              Hi, {user.name || user.email}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-2"
              style={{
                backgroundColor: memoraColors.primary,
                borderRadius: "20px",
                color: "white",
                fontWeight: 600,
                border: "none",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="text-decoration-none px-3 py-2"
            style={{
              backgroundColor: memoraColors.primary,
              borderRadius: "20px",
              color: "white",
              fontWeight: 600,
            }}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
