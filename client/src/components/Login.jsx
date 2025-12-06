
import { useState, useEffect } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
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

  const { msg, loading, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email: loginId,
      password: loginPwd,
    };

    try {
      await dispatch(loginThunk(data)).unwrap();
      navigate("/people");
    } catch (error) {
      // الخطأ سيتم تخزينه في msg من الـ slice
      console.log("Login error:", error);
    }
  };

  // إذا المستخدم already logged in (مثلاً من localStorage)، نوجهه مباشرة
  useEffect(() => {
    if (user) {
      navigate("/people");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          backgroundColor: memoraColors.pageBg,
        }}
      >
        <div
          style={{
            backgroundColor: memoraColors.cardBg,
            borderRadius: "40px",
            padding: "48px 40px",
            minWidth: "360px",
            maxWidth: "420px",
            boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
          }}
        >
          {/* Logo / Title */}
          <h1
            style={{
              textAlign: "center",
              color: memoraColors.primary,
              fontWeight: "800",
              fontSize: "40px",
              marginBottom: "4px",
            }}
          >
            Memora
          </h1>
          <h3
            style={{
              textAlign: "center",
              color: memoraColors.primary,
              fontWeight: "600",
              fontSize: "20px",
              marginBottom: "32px",
            }}
          >
            Login
          </h3>

          <Form onSubmit={handleLogin}>
            <FormGroup style={{ marginBottom: "18px" }}>
              <Input
                type="email"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                required
                style={{
                  backgroundColor: memoraColors.inputBg,
                  borderRadius: "999px",
                  border: "none",
                  padding: "12px 20px",
                  fontSize: "14px",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.6)",
                }}
                placeholder="Email"
              />
            </FormGroup>

            <FormGroup style={{ marginBottom: "12px" }}>
              <Input
                type="password"
                value={loginPwd}
                onChange={(e) => setLoginPwd(e.target.value)}
                required
                style={{
                  backgroundColor: memoraColors.inputBg,
                  borderRadius: "999px",
                  border: "none",
                  padding: "12px 20px",
                  fontSize: "14px",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.6)",
                }}
                placeholder="Password"
              />
            </FormGroup>

            <FormGroup
              check
              style={{
                marginBottom: "24px",
              }}
            >
              <Input
                type="checkbox"
                style={{
                  cursor: "pointer",
                }}
              />{" "}
              <Label
                check
                style={{
                  color: memoraColors.textMuted,
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Remember me
              </Label>
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
                fontWeight: "700",
                fontSize: "18px",
                opacity: loading ? 0.8 : 1,
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form>

          {msg && (
            <p
              className="text-center mt-3"
              style={{ color: "#ff4b4b", fontWeight: "600", fontSize: "14px" }}
            >
              {msg}
            </p>
          )}

          <div
            style={{ marginTop: "18px", textAlign: "center", fontSize: "13px" }}
          >
            <div>
              <Link
                to="#"
                style={{
                  color: memoraColors.linkBlue,
                  textDecoration: "none",
                }}
              >
                Forget Password
              </Link>
            </div>
            <div style={{ marginTop: "6px", color: memoraColors.textMuted }}>
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                style={{
                  color: memoraColors.linkBlue,
                  textDecoration: "none",
                  fontWeight: "600",
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
