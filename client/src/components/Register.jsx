// src/pages/Register.jsx (أو حسب مسارك)

import { useState, useEffect } from "react";
import { Container, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "../slices/authSlice"; // غيّريها إذا اسمها مختلف عندك
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

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // إذا عندك نفس بنية auth slice في Login استخدمي نفس المفاتيح
  const { msg, loading, user } = useSelector((state) => state.auth);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const [localError, setLocalError] = useState("");
  const [localSuccess, setLocalSuccess] = useState("");

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

  const handleRegister = async (e) => {
    e.preventDefault();
    setLocalError("");
    setLocalSuccess("");

    // تحقق بسيط قبل الإرسال
    if (!fullName.trim()) return setLocalError("Please enter your full name.");
    if (!email.trim()) return setLocalError("Please enter your email.");
    if (password.length < 6) return setLocalError("Password must be at least 6 characters.");
    if (password !== confirmPwd) return setLocalError("Passwords do not match.");

    const data = {
      name: fullName,
      email,
      password,
    };

    try {
      await dispatch(registerThunk(data)).unwrap();
      setLocalSuccess("Account created successfully. You can login now.");
      // بإمكانك توجهين المستخدم مباشرة للـ login:
      navigate("/login");
    } catch (error) {
      // msg من redux غالبًا سيظهر، وهذا احتياط
      console.log("Register error:", error);
    }
  };

  return (
    <div style={{ backgroundColor: memoraColors.pageBg, minHeight: "100vh" }}>
      <Navbar />

      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "calc(100vh - 72px)",
          padding: "24px 12px",
        }}
      >
        <div
          className="w-100"
          style={{
            maxWidth: "460px",
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
              Create Account
            </h3>

            <p
              style={{
                color: memoraColors.textMuted,
                fontSize: "13px",
                marginBottom: 0,
              }}
            >
              Register to start saving your favorite people and occasions.
            </p>
          </div>

          {/* Alerts */}
          {localSuccess && (
            <Alert
              className="py-2 text-center"
              style={{
                backgroundColor: "#e8fff0",
                borderColor: "#9ae6b4",
                color: "#157347",
                borderRadius: "16px",
                fontWeight: 600,
                fontSize: "13px",
              }}
            >
              {localSuccess}
            </Alert>
          )}

          {(localError || msg) && (
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
              {localError || msg}
            </Alert>
          )}

          {/* Form */}
          <Form onSubmit={handleRegister}>
            <FormGroup className="mb-3">
              <Label className="fw-semibold mb-2" style={{ color: memoraColors.textMain, fontSize: "13px" }}>
                Full Name
              </Label>
              <Input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your name"
                required
                style={inputStyle}
              />
            </FormGroup>

            <FormGroup className="mb-3">
              <Label className="fw-semibold mb-2" style={{ color: memoraColors.textMain, fontSize: "13px" }}>
                Email
              </Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
                style={inputStyle}
              />
            </FormGroup>

            <FormGroup className="mb-3">
              <Label className="fw-semibold mb-2" style={{ color: memoraColors.textMain, fontSize: "13px" }}>
                Password
              </Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={inputStyle}
              />
              <div style={{ color: memoraColors.textMuted, fontSize: "12px", marginTop: "8px" }}>
                Use at least 6 characters.
              </div>
            </FormGroup>

            <FormGroup className="mb-4">
              <Label className="fw-semibold mb-2" style={{ color: memoraColors.textMain, fontSize: "13px" }}>
                Confirm Password
              </Label>
              <Input
                type="password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                placeholder="••••••••"
                required
                style={inputStyle}
              />
            </FormGroup>

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
              {loading ? "Creating..." : "Register"}
            </Button>
          </Form>

          {/* Footer */}
          <div style={{ marginTop: "18px", textAlign: "center" }}>
            <div style={{ color: memoraColors.textMuted, fontSize: "13px" }}>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: memoraColors.linkBlue,
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                Login here
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
