
import { useState } from "react";
import { Container, Form, FormGroup, Input, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

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
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [localError, setLocalError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { msg, loading } = useSelector((state) => state.auth);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (pwd !== confirmPwd) {
      setLocalError("Passwords do not match");
      return;
    }

    const data = { username, email, password: pwd };

    try {
      await dispatch(registerThunk(data)).unwrap();
      navigate("/login");
    } catch (error) {
      console.log("Register error:", error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: memoraColors.pageBg,
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
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
            Register
          </h3>

          <Form onSubmit={handleRegister}>
            {/* username */}
            <FormGroup>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  backgroundColor: memoraColors.inputBg,
                  borderRadius: "999px",
                  border: "none",
                  padding: "12px 20px",
                  fontSize: "14px",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.6)",
                  marginBottom: "12px",
                }}
                placeholder="username"
              />
            </FormGroup>

            {/* Email */}
            <FormGroup>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  backgroundColor: memoraColors.inputBg,
                  borderRadius: "999px",
                  border: "none",
                  padding: "12px 20px",
                  fontSize: "14px",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.6)",
                  marginBottom: "12px",
                }}
                placeholder="Email"
              />
            </FormGroup>

            {/* Password */}
            <FormGroup>
              <Input
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                required
                style={{
                  backgroundColor: memoraColors.inputBg,
                  borderRadius: "999px",
                  border: "none",
                  padding: "12px 20px",
                  fontSize: "14px",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.6)",
                  marginBottom: "12px",
                }}
                placeholder="Password"
              />
            </FormGroup>

            {/* Confirm Password */}
            <FormGroup>
              <Input
                type="password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                required
                style={{
                  backgroundColor: memoraColors.inputBg,
                  borderRadius: "999px",
                  border: "none",
                  padding: "12px 20px",
                  fontSize: "14px",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.6)",
                  marginBottom: "8px",
                }}
                placeholder="Confirm Password"
              />
            </FormGroup>

            {localError && (
              <p
                className="text-center"
                style={{
                  color: "#ff4b4b",
                  fontWeight: "600",
                  fontSize: "13px",
                  marginBottom: "8px",
                }}
              >
                {localError}
              </p>
            )}

            <Button
              type="submit"
              color="primary"
              className="w-100 rounded-pill mt-3"
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
              {loading ? "Registering..." : "Register"}
            </Button>
          </Form>

          {msg && (
            <p className="text-danger text-center mt-3" style={{ fontSize: 13 }}>
              {msg}
            </p>
          )}

          <div
            style={{ marginTop: "18px", textAlign: "center", fontSize: "13px" }}
          >
            <div style={{ marginTop: "6px", color: memoraColors.textMuted }}>
              Already registered?{" "}
              <Link
                to="/login"
                style={{
                  color: memoraColors.linkBlue,
                  textDecoration: "none",
                  fontWeight: "600",
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
