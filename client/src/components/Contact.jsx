// src/components/Contact.jsx
import React, { useState } from "react";
import Navbar from "./Navbar";

const memoraColors = {
  pageBg: "#B69BCF",
  cardBg: "#EEDFF7",
  primary: "#4C1B6F",
  inputBg: "#FFFFFF",
  placeholder: "#D0C2DE",
  textMain: "#3B2349",
  textMuted: "#8A7A9A",
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا مستقبلاً يمكن ربطه بباك إند / خدمة إرسال إيميل
    console.log("Contact message:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div style={{ backgroundColor: memoraColors.pageBg, minHeight: "100vh" }}>
      <Navbar />

      <div
        className="container py-5"
        style={{
          color: memoraColors.textMain,
          maxWidth: "800px",
        }}
      >
        {/* Title */}
        <div className="text-center mb-4">
          <h1
            className="fw-bold mb-3"
            style={{
              fontFamily: "'Fredoka One', sans-serif",
              color: memoraColors.primary,
            }}
          >
            Contact Us
          </h1>
        <br/>

          <p
            style={{
              color: memoraColors.inputBg,
              fontSize: "1.3rem",
              fontWeight: 500,
            }}
          >
            We'd love to hear your feedback, questions, or suggestions!
          </p>
        </div>
        <br/>


<div
          className="rounded-4 p-4 text-center"
          style={{ backgroundColor: memoraColors.cardBg }}
        >
          <h4
            className="mb-3 text-center" 
            style={{ color: memoraColors.primary, fontWeight: 600 }}
          >
            Send us a message
          </h4>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
          
              <textarea
                name="message"
                
                rows={4}
                className="form-control"
                style={{
                  backgroundColor: memoraColors.inputBg,
                  borderColor: memoraColors.placeholder,
                  borderRadius: "20px",
                  resize: "none",
                }}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <div className="d-flex justify-content-end text-center">
              <button
                type="submit"
                className="btn px-4 text-center"
                style={{
                  backgroundColor: memoraColors.primary,
                  color: "#fff",
                  borderRadius: "999px",
                  fontWeight: 600,
                  margin: "center"
                }}
              >
                Send Message
              </button>
            </div>

            {submitted && (
              <p
                className="mt-3 text-success text-end"
                style={{ fontWeight: 500 }}
              >
                Thank you! Your message has been sent.
              </p>
            )}
          </form>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        {/* Contact info cards */}
        <div className="row gy-3 mb-5 text-center">
          {/* WhatsApp */}
          <div className="col-md-4">
            <div
              className="p-3 rounded-4 h-100"
              style={{
                backgroundColor: memoraColors.cardBg,
              }}
            >
              <div style={{ fontSize: "2rem" }}>📱</div>
              <h5 className="mt-2" style={{ color: memoraColors.primary }}>
                WhatsApp
              </h5>
              <a
                href="https://wa.me/99999999"
                style={{
                  color: memoraColors.textMain,
                  textDecoration: "underline",
                  fontWeight: 500,
                }}
              >
                99999999
              </a>
            </div>
          </div>

          {/* Instagram */}
          <div className="col-md-4">
            <div
              className="p-3 rounded-4 h-100"
              style={{
                backgroundColor: memoraColors.cardBg,
              }}
            >
              <div style={{ fontSize: "2rem" }}>📷</div>
              <h5 className="mt-2" style={{ color: memoraColors.primary }}>
                Instagram
              </h5>
              <a
                href="https://instagram.com/memora_om"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: memoraColors.textMain,
                  textDecoration: "underline",
                  fontWeight: 500,
                }}
              >
                @memora_om
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="col-md-4">
            <div
              className="p-3 rounded-4 h-100"
              style={{
                backgroundColor: memoraColors.cardBg,
              }}
            >
              <div style={{ fontSize: "2rem" }}>📩</div>
              <h5 className="mt-2" style={{ color: memoraColors.primary }}>
                Email
              </h5>
              <a
                href="mailto:memora@gmail.com"
                style={{
                  color: memoraColors.textMain,
                  textDecoration: "underline",
                  fontWeight: 500,
                }}
              >
                memora@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Send Message form */}
        
      </div>
    </div>
  );
}
