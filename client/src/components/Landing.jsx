
import logo from "../images/memora.png";

import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
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
  lightBg: "#E6DBED",
  heroCardBg: "#F7F0FF",
};

export default function Landing() {
  return (
    <div style={{ backgroundColor: memoraColors.lightBg, minHeight: "100vh" }}>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section
          style={{
            backgroundColor: memoraColors.pageBg,
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <Container
            fluid
            style={{
              minHeight: "100vh",
              backgroundColor: memoraColors.pageBg,
            }}
          >
            <Row className="align-items-center">
              {/* Left side - Text */}
              <Col md="6" className="text-center text-md-start mb-5 mb-md-0">
                <h1
                  className="text-center"
                  style={{
                    fontFamily: "'Fredoka One', sans-serif",
                    color: memoraColors.primary,
                    fontWeight: 500,
                    fontSize: "5rem",
                    marginBottom: "8px",
                  }}
                >
                  Memora
                </h1>

                <h3
                  className="text-center"
                  style={{
                    fontFamily: "'Fredoka One', sans-serif",
                    color: memoraColors.primary,
                    fontWeight: 400,
                    fontSize: "2rem",
                    marginBottom: "16px",
                  }}
                >
                  Never Miss a Special Date
                </h3>

                <p
                  className="text-center"
                  style={{
                    color: "#E6DBED",
                    fontWeight: 400,
                    fontSize: "1.05rem",
                    maxWidth: "480px",
                    margin: "0 auto 32px",
                  }}
                >
                  Your personalized platform for cherishing memories, managing
                  events, and finding the perfect gifts.
                </p>

                <div className="d-flex justify-content-center justify-content-md-start">
                  <Link to="/register">
                    <Button
                      type="button"
                      style={{
                        backgroundColor: memoraColors.lightBg,
                        border: "none",
                        borderRadius: "200px",
                        padding: "14px 40px",
                        fontWeight: 700,
                        fontSize: "1.05rem",
                        color: memoraColors.primary,
                      }}
                    >
                      Start Making Memories
                    </Button>
                  </Link>
                </div>
              </Col>

              {/* Right side - Image card */}
              <Col md="6" className="d-flex justify-content-center">
                <div
                  className="text-center"
                  style={{
                    backgroundColor: memoraColors.heroCardBg,
                    borderRadius: "40px",
                    padding: "48px 32px",
                    maxWidth: "460px",
                    width: "100%",
                  }}
                >
                  <img
                    src={logo}
                    alt="Memora Book Icon"
                    style={{
                      width: "260px",
                      height: "auto",
                      marginBottom: "16px",
                    }}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Why Memora Section */}
        <section
          id="why-memora"
          style={{ paddingTop: "80px", paddingBottom: "40px" }}
        >
          <Container>
            <h2
              className="text-center"
              style={{
                fontFamily: "'Fredoka One', sans-serif",
                color: memoraColors.primary,
                fontSize: "2.6rem",
                fontWeight: 500,
              }}
            >
              Why Memora?
            </h2>
            <br />

            <Row className="gy-4 justify-content-center text-center">
              <Col md="4" sm="6" xs="12">
                <div
                  className="p-4 rounded-4 mx-auto text-center"
                  style={{
                    backgroundColor: memoraColors.pageBg,
                    color: "#FFFFFF",
                    maxWidth: "280px",
                  }}
                >
                  <h4
                    className="mb-3 text-center"
                    style={{ fontSize: "1.3rem", fontWeight: 700 }}
                  >
                    Event Tracking
                  </h4>
                  <p style={{ fontSize: "0.98rem", marginBottom: 0 }}>
                    Effortlessly manage birthdays, anniversaries, and custom
                    events for everyone you care about.
                  </p>
                </div>
              </Col>

              <Col md="4" sm="6" xs="12">
                <div
                  className="p-4 rounded-4 mx-auto text-center"
                  style={{
                    backgroundColor: memoraColors.pageBg,
                    color: "#FFFFFF",
                    maxWidth: "280px",
                  }}
                >
                  <h4
                    className="mb-3"
                    style={{ fontSize: "1.3rem", fontWeight: 700 }}
                  >
                    Personalized Gifts
                  </h4>
                  <p style={{ fontSize: "0.98rem", marginBottom: 0 }}>
                    Get smart gift ideas that match the event, so you can always
                    choose the right present.
                  </p>
                </div>
              </Col>

              <Col md="4" sm="6" xs="12">
                <div
                  className="p-4 rounded-4 mx-auto"
                  style={{
                    backgroundColor: memoraColors.pageBg,
                    color: "#FFFFFF",
                    maxWidth: "280px",
                  }}
                >
                  <h4
                    className="mb-3"
                    style={{ fontSize: "1.3rem", fontWeight: 700 }}
                  >
                    Timely Notifications
                  </h4>
                  <p style={{ fontSize: "0.98rem", marginBottom: 0 }}>
                    Set reminders ahead of time, so you are always ready for
                    special moments.
                  </p>
                </div>
              </Col>
            </Row>

            <div className="d-flex justify-content-center mt-5 mb-3">
              <Link to="/register">
                <Button
                  type="button"
                  style={{
                    backgroundColor: memoraColors.primary,
                    border: "none",
                    borderRadius: "999px",
                    padding: "14px 42px",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                  }}
                >
                  Create Your Account
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
}
