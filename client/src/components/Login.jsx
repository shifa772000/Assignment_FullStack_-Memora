// src/pages/Login.jsx  (أو حسب مسارك الحالي)
// ملاحظة: نفس الاستيرادات والمنطق الموجود في ملفك، مع تحسين الواجهة فقط.

import { useState, useEffect } from "react";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

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

export default function Login() {
  const [loginId, setLoginId] = useState("");
  const [loginPwd, setLoginPwd] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const { msg, loading, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email: loginId,
      password: loginPwd,
      rememberMe, // اختياري (لو ما عندك دعم لها في الباك/الريدوكس ما راح تضر)
    };

    try {
      await dispatch(loginThunk(data)).unwrap();
      navigate("/people");
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  useEffect(() => {
    if (user) navigate("/people");
  }, [user, navigate]);

  const inputStyle = {
    backgroundColor: memoraColors.inputBg,
    borderRadius: "999px",
    border: `1px solid ${memoraColors.placeholder}`,
    padding: "12px 18px",
    fontSize: "14px",
    color: memoraColors.textMain,
    boxShadow: "0 0 0 1px rgba(255,255,255,0.55)",
  };

  return (
    <div style={{ backgroundColor: memoraColors.pageBg, minHeight: "100vh" }}>
      <Navbar />

      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "calc(100vh - 72px)", // يترك مساحة للـ Navbar
          padding: "24px 12px",
        }}
      >
        <div
          className="w-100"
          style={{
            maxWidth: "420px",
            backgroundColor: memoraColors.cardBg,
            borderRadius: "40px",
            padding: "44px 38px",
            boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
          }}
        >
          {/* Header */}
          <div className="text-center mb-4">
            <h1
              style={{
                color: memoraColors.primary,
                fontWeight: 800,
                fontSize: "40px",
                marginBottom: "6px",
                fontFamily: "'Fredoka One', sans-serif",
                letterSpacing: "0.5px",
              }}
            >
              Memora
            </h1>

            <h3
              style={{
                color: memoraColors.primary,
                fontWeight: 700,
                fontSize: "20px",
                marginBottom: "10px",
              }}
            >
              Login
            </h3>

            <p
              style={{
                color: memoraColors.textMuted,
                fontSize: "13px",
                marginBottom: 0,
              }}
            >
              Welcome back. Please sign in to continue.
            </p>
          </div>

          {/* Message */}
          {msg && (
            <Alert
              className="py-2 text-center"
              style={{
                backgroundColor: "#ffe7ea",
                borderColor: "#f3a3ac",
                color: "#b4232c",
                borderRadius: "16px",
                fontWeight: 600,
                fontSize: "13px",
              }}
            >
              {msg}
            </Alert>
          )}

          {/* Form */}
          <Form onSubmit={handleLogin}>
            <FormGroup className="mb-3">
              <Label
                className="fw-semibold mb-2"
                style={{ color: memoraColors.textMain, fontSize: "13px" }}
              >
                Email
              </Label>
              <Input
                type="email"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                required
                placeholder="example@email.com"
                style={inputStyle}
              />
            </FormGroup>

            <FormGroup className="mb-2">
              <Label
                className="fw-semibold mb-2"
                style={{ color: memoraColors.textMain, fontSize: "13px" }}
              >
                Password
              </Label>
              <Input
                type="password"
                value={loginPwd}
                onChange={(e) => setLoginPwd(e.target.value)}
                required
                placeholder="••••••••"
                style={inputStyle}
              />
            </FormGroup>

            {/* Remember + Forgot */}
            <div className="d-flex justify-content-between align-items-center mb-4 mt-3">
              <div className="d-flex align-items-center gap-2">
                <Input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ cursor: "pointer" }}
                />
                <span
                  style={{ color: memoraColors.textMuted, fontSize: "13px" }}
                >
                  Remember me
                </span>
              </div>

              <Link
                to="/forgot-password"
                style={{
                  color: memoraColors.linkBlue,
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-100"
              disabled={loading}
              style={{
                backgroundColor: memoraColors.primary,
                border: "none",
                borderRadius: "999px",
                padding: "12px 0",
                fontWeight: 800,
                fontSize: "18px",
                opacity: loading ? 0.85 : 1,
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form>

          {/* Footer links */}
          <div style={{ marginTop: "18px", textAlign: "center" }}>
            <div style={{ color: memoraColors.textMuted, fontSize: "13px" }}>
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                style={{
                  color: memoraColors.linkBlue,
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                Register here
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
