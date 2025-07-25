import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Paper,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  Phone,
  Email,
  LocationOn,
  Schedule,
  Send,
  Support,
  QuestionAnswer,
  BugReport,
  Feedback,
} from "@mui/icons-material";
import SmartNavbar from "../../shared/components/organisms/smartNavbar";
import SmartFooter from "../../shared/components/organisms/smartFooter/SmartFooter";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const contactInfo = [
    {
      icon: <Phone />,
      title: "Phone Support",
      content: "+1 (555) 123-4567",
      description: "Mon-Fri 9AM-6PM EST",
    },
    {
      icon: <Email />,
      title: "Email Support",
      content: "support@smarttank.com",
      description: "We'll respond within 24 hours",
    },
    {
      icon: <LocationOn />,
      title: "Office Location",
      content: "123 Aquarium St, Fish City, FC 12345",
      description: "Visit us for in-person consultations",
    },
    {
      icon: <Schedule />,
      title: "Business Hours",
      content: "Mon-Fri: 9AM-6PM",
      description: "Weekend: 10AM-4PM",
    },
  ];

  const inquiryTypes = [
    {
      icon: <Support />,
      title: "Technical Support",
      description:
        "Get help with water monitoring, app issues, or equipment setup.",
    },
    {
      icon: <QuestionAnswer />,
      title: "General Inquiries",
      description:
        "Questions about our services, pricing, or partnership opportunities.",
    },
    {
      icon: <BugReport />,
      title: "Report a Bug",
      description:
        "Found an issue with our platform? Let us know so we can fix it.",
    },
    {
      icon: <Feedback />,
      title: "Feedback & Suggestions",
      description:
        "Share your ideas to help us improve Smart Tank for everyone.",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    setShowSuccess(true);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      category: "general",
    });
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f8fafc 0%, #e2e8f0 100%)",
      }}
    >
      <SmartNavbar />

      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
          py: 12,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 70% 30%, rgba(0, 119, 255, 0.1) 0%, transparent 50%)",
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ textAlign: "center", color: "white" }}>
            <Typography
              variant="h2"
              component="h1"
              fontWeight="bold"
              sx={{
                mb: 3,
                fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
              }}
            >
              Contact{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(45deg, #00c0ff, #0077ff)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Smart Tank
              </Box>
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "#94a3b8",
                maxWidth: 700,
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              We're here to help you with your aquarium journey. Get in touch
              with our expert team for support, questions, or feedback.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Contact Information Cards */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 4,
          }}
        >
          {contactInfo.map((info, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                p: 3,
                textAlign: "center",
                height: "100%",
                background: "linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)",
                borderRadius: 3,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
            >
              <Box
                sx={{
                  color: "#0077ff",
                  mb: 2,
                  "& svg": { fontSize: "2.5rem" },
                }}
              >
                {info.icon}
              </Box>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                {info.title}
              </Typography>
              <Typography
                variant="body1"
                color="primary"
                sx={{ mb: 1, fontWeight: 500 }}
              >
                {info.content}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {info.description}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Container>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ pb: 8 }}>
        <Box
          sx={{
            display: { xs: "block", md: "grid" },
            gridTemplateColumns: { md: "2fr 1fr" },
            gap: 6,
          }}
        >
          {/* Contact Form */}
          <Box>
            <Paper
              elevation={5}
              sx={{
                p: 4,
                borderRadius: 3,
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ mb: 3, color: "#1e293b" }}
              >
                Send Us a Message
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                <Box
                  sx={{
                    display: { xs: "block", sm: "grid" },
                    gridTemplateColumns: { sm: "1fr 1fr" },
                    gap: 3,
                  }}
                >
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    sx={{ mb: { xs: 3, sm: 0 } }}
                  />
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                  />
                </Box>

                <TextField
                  fullWidth
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                />

                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  multiline
                  rows={6}
                  variant="outlined"
                  placeholder="Tell us how we can help you..."
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={<Send />}
                  sx={{
                    background: "linear-gradient(45deg, #00c0ff, #0077ff)",
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    "&:hover": {
                      background: "linear-gradient(45deg, #0077ff, #0056cc)",
                    },
                  }}
                >
                  Send Message
                </Button>
              </Box>
            </Paper>
          </Box>

          {/* Inquiry Types */}
          <Box sx={{ mt: { xs: 6, md: 0 } }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ mb: 3, color: "#1e293b" }}
            >
              How Can We Help?
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {inquiryTypes.map((type, index) => (
                <Card
                  key={index}
                  elevation={2}
                  sx={{
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateX(5px)",
                      boxShadow: "0 5px 20px rgba(0, 119, 255, 0.1)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          color: "#0077ff",
                          mt: 0.5,
                          "& svg": { fontSize: "1.5rem" },
                        }}
                      >
                        {type.icon}
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          sx={{ mb: 1 }}
                        >
                          {type.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ lineHeight: 1.5 }}
                        >
                          {type.description}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>

      {/* FAQ Section */}
      <Box sx={{ background: "#f8fafc", py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            fontWeight="bold"
            textAlign="center"
            sx={{ mb: 6, color: "#1e293b" }}
          >
            Frequently Asked Questions
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr",
              },
              gap: 4,
            }}
          >
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ mb: 2, color: "#0077ff" }}
              >
                How does water monitoring work?
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.6 }}
              >
                Our smart sensors continuously monitor pH, temperature, ammonia,
                and other key parameters, sending real-time data to your
                smartphone for instant alerts and insights.
              </Typography>
            </Paper>

            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ mb: 2, color: "#0077ff" }}
              >
                How do I find local fish stores?
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.6 }}
              >
                Use our store locator feature to find verified aquarium stores
                and fish sellers near you, complete with reviews, ratings, and
                available species information.
              </Typography>
            </Paper>

            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ mb: 2, color: "#0077ff" }}
              >
                Is there a mobile app?
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.6 }}
              >
                Yes! Our mobile app is available for both iOS and Android,
                allowing you to monitor your tank, receive alerts, and connect
                with the community on the go.
              </Typography>
            </Paper>

            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ mb: 2, color: "#0077ff" }}
              >
                What support do you provide?
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.6 }}
              >
                We offer 24/7 technical support, expert consultation, community
                forums, and comprehensive guides to help you succeed in your
                aquarium journey.
              </Typography>
            </Paper>
          </Box>
        </Container>
      </Box>

      {/* Success Message */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          sx={{ width: "100%" }}
        >
          Thank you for your message! We'll get back to you within 24 hours.
        </Alert>
      </Snackbar>

      <SmartFooter />
    </Box>
  );
};

export default ContactUs;
