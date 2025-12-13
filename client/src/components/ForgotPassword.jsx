import { useState } from "react";
import { Container, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { Link } from "react-router-dom";
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

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // رسائل بسيطة للمستخدم
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const inputStyle = {
    backgroundColor: memoraColors.inputBg,
    borderRadius: "999px",
    border: `1px solid ${memoraColors.placeholder}`,
    padding: "12px 18px",
    fontSize: "14px",
    color: memoraColors.textMain,
    boxShadow: "0 0 0 1px rgba(255,255,255,0.55)",
  };

  const handleSendLink = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    setLoading(true);

    try {
      // IMPORTANT:
      // هذا مثال لطلب API. عدّلي الرابط حسب سيرفرك.
      // لازم يكون عندك endpoint مثل:
      // POST http://localhost:5000/api/auth/forgot-password
      // body: { email }
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || "Unable to process your request right now.");
      }

      setSuccessMsg("If this email exists, a reset link has been sent.");
      setEmail("");
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
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
            maxWidth: "440px",
            backgroundColor: memoraColors.cardBg,
            borderRadius: "40px",
            padding: "44px 38px",
            boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
          }}
        >
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
              Forgot Password
            </h3>

            <p
              style={{
                color: memoraColors.textMuted,
                fontSize: "13px",
                marginBottom: 0,
              }}
            >
              Enter your email and we will send you a password reset link.
            </p>
          </div>

          {successMsg && (
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
              {successMsg}
            </Alert>
          )}

          {errorMsg && (
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
              {errorMsg}
            </Alert>
          )}

          <Form onSubmit={handleSendLink}>
            <FormGroup className="mb-4">
              <Label
                className="fw-semibold mb-2"
                style={{ color: memoraColors.textMain, fontSize: "13px" }}
              >
                Email
              </Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@email.com"
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
              {loading ? "Sending..." : "Send reset link"}
            </Button>
          </Form>

          <div style={{ marginTop: "18px", textAlign: "center" }}>
            <Link
              to="/login"
              style={{
                color: memoraColors.linkBlue,
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 700,
              }}
            >
              Back to Login
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
