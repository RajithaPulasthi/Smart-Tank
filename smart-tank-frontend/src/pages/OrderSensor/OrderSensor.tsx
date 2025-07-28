import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Divider,
  Grid,
  Chip,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  CreditCard,
  Security,
  CheckCircle,
  LocalShipping,
  ArrowBack,
  Sensors,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthService from "../../services/authService";

const OrderSensor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState("");

  // Check authentication on component mount
  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      // Redirect to login if not authenticated
      navigate("/signin");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
    email: "",
    billingAddress: "",
    billingPhone: "",
    city: "",
    postalCode: "",
  });

  const productPrice = 10000.0; // LKR
  const shipping = 0; // Free shipping
  const total = productPrice + shipping;

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const formatted = formatCardNumber(event.target.value);
    setFormData((prev) => ({
      ...prev,
      cardNumber: formatted,
    }));
  };

  const handleExpiryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    setFormData((prev) => ({
      ...prev,
      expiryDate: value,
    }));
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Remove all non-digits and format as Sri Lankan phone number
    let value = event.target.value.replace(/\D/g, "");

    // Add formatting for Sri Lankan numbers
    if (value.startsWith("94")) {
      // International format
      if (value.length > 2) {
        value = value.substring(0, 2) + " " + value.substring(2);
      }
      if (value.length > 5) {
        value = value.substring(0, 5) + " " + value.substring(5);
      }
      if (value.length > 9) {
        value = value.substring(0, 9) + " " + value.substring(9, 13);
      }
    } else if (value.startsWith("0")) {
      // Local format
      if (value.length > 3) {
        value = value.substring(0, 3) + " " + value.substring(3);
      }
      if (value.length > 7) {
        value = value.substring(0, 7) + " " + value.substring(7, 11);
      }
    } else if (value.length > 0) {
      // Add +94 prefix if no country code
      value = "+94 " + value;
      if (value.length > 7) {
        value = value.substring(0, 7) + " " + value.substring(7);
      }
      if (value.length > 11) {
        value = value.substring(0, 11) + " " + value.substring(11, 15);
      }
    }

    setFormData((prev) => ({
      ...prev,
      billingPhone: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate form
      if (
        !formData.cardNumber ||
        !formData.expiryDate ||
        !formData.cvv ||
        !formData.cardHolderName ||
        !formData.email ||
        !formData.billingAddress ||
        !formData.billingPhone
      ) {
        throw new Error("Please fill in all required fields");
      }

      // Get authentication token
      const token = AuthService.getToken();
      if (!token) {
        throw new Error("Authentication required. Please log in again.");
      }

      // Call the payment API
      const response = await fetch("http://localhost:8080/api/Payments/add", {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          billingName: formData.cardHolderName,
          billingAddress: formData.billingAddress,
          billingEmail: formData.email,
          billingPhone: formData.billingPhone,
          service: "Smart Tank Sensor",
          paymentMethod: "Credit Card",
          amount: total,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid, redirect to login
          AuthService.logout();
          navigate("/signin");
          throw new Error("Session expired. Please log in again.");
        }
        throw new Error(`Payment failed: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Payment successful:", result);

      setOrderSuccess(true);

      // Redirect to success page after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Payment failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh", py: 8 }}>
        <Container maxWidth="md">
          <Card sx={{ textAlign: "center", p: 6 }}>
            <CheckCircle sx={{ fontSize: 80, color: "#00c0ff", mb: 3 }} />
            <Typography
              variant="h4"
              sx={{ mb: 2, fontWeight: "bold", color: "#1e293b" }}
            >
              Order Successful!
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, color: "#64748b" }}>
              Your Smart Tank Sensor has been ordered successfully.
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: "#64748b" }}>
              You will receive a confirmation email shortly with tracking
              details.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/")}
              sx={{
                background: "linear-gradient(45deg, #00c0ff, #0077ff)",
                px: 4,
                py: 1.5,
              }}
            >
              Return to Home
            </Button>
          </Card>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate("/smart-sensor")}
            sx={{ mb: 2, color: "#64748b" }}
          >
            Back to Product
          </Button>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1e293b" }}
          >
            Complete Your Order
          </Typography>
          <Typography variant="body1" sx={{ color: "#64748b", mt: 1 }}>
            Secure checkout for your Smart Tank Sensor
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Order Summary */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ position: "sticky", top: 20 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
                  Order Summary
                </Typography>

                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      background: "linear-gradient(45deg, #00c0ff, #0077ff)",
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Sensors sx={{ fontSize: 40, color: "white" }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Smart Tank Sensor
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#64748b", mb: 1 }}
                    >
                      IoT Water Monitoring Device
                    </Typography>
                    <Chip label="In Stock" size="small" color="success" />
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ space: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography>Product Price:</Typography>
                    <Typography>
                      LKR {productPrice.toLocaleString()}.00
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography>Shipping:</Typography>
                    <Typography sx={{ color: "#00c0ff" }}>Free</Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Total:
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "#00c0ff" }}
                    >
                      LKR {total.toLocaleString()}.00
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mt: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Security sx={{ fontSize: 16, color: "#00c0ff" }} />
                    <Typography variant="body2">
                      Secure SSL Encryption
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <LocalShipping sx={{ fontSize: 16, color: "#00c0ff" }} />
                    <Typography variant="body2">
                      Free Worldwide Shipping
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CheckCircle sx={{ fontSize: 16, color: "#00c0ff" }} />
                    <Typography variant="body2">2-Year Warranty</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Payment Form */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}
                >
                  <CreditCard sx={{ fontSize: 28, color: "#00c0ff" }} />
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    Payment Information
                  </Typography>
                </Box>

                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    {/* Card Details */}
                    <Grid size={{ xs: 12 }}>
                      <Typography
                        variant="h6"
                        sx={{ mb: 2, fontWeight: "bold" }}
                      >
                        Card Details
                      </Typography>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Card Holder Name"
                        value={formData.cardHolderName}
                        onChange={handleInputChange("cardHolderName")}
                        required
                        variant="outlined"
                      />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Card Number"
                        value={formData.cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="1234 5678 9012 3456"
                        inputProps={{ maxLength: 19 }}
                        required
                        variant="outlined"
                      />
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                      <TextField
                        fullWidth
                        label="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleExpiryChange}
                        placeholder="12/25"
                        inputProps={{ maxLength: 5 }}
                        required
                        variant="outlined"
                      />
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                      <TextField
                        fullWidth
                        label="CVV"
                        value={formData.cvv}
                        onChange={handleInputChange("cvv")}
                        placeholder="123"
                        inputProps={{ maxLength: 4 }}
                        required
                        variant="outlined"
                      />
                    </Grid>

                    {/* Billing Information */}
                    <Grid size={{ xs: 12 }}>
                      <Typography
                        variant="h6"
                        sx={{ mb: 2, mt: 2, fontWeight: "bold" }}
                      >
                        Billing Information
                      </Typography>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange("email")}
                        required
                        variant="outlined"
                      />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        type="tel"
                        value={formData.billingPhone}
                        onChange={handlePhoneChange}
                        placeholder="+94 77 123 4567"
                        required
                        variant="outlined"
                      />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Billing Address"
                        value={formData.billingAddress}
                        onChange={handleInputChange("billingAddress")}
                        required
                        variant="outlined"
                      />
                    </Grid>

                    <Grid size={{ xs: 8 }}>
                      <TextField
                        fullWidth
                        label="City"
                        value={formData.city}
                        onChange={handleInputChange("city")}
                        required
                        variant="outlined"
                      />
                    </Grid>

                    <Grid size={{ xs: 4 }}>
                      <TextField
                        fullWidth
                        label="Postal Code"
                        value={formData.postalCode}
                        onChange={handleInputChange("postalCode")}
                        required
                        variant="outlined"
                      />
                    </Grid>

                    {/* Submit Button */}
                    <Grid size={{ xs: 12 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={loading}
                        sx={{
                          mt: 3,
                          py: 2,
                          fontSize: "1.1rem",
                          fontWeight: "bold",
                          background:
                            "linear-gradient(45deg, #00c0ff, #0077ff)",
                          "&:hover": {
                            background:
                              "linear-gradient(45deg, #0077ff, #0056cc)",
                          },
                          "&:disabled": {
                            background: "#94a3b8",
                          },
                        }}
                      >
                        {loading ? (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <CircularProgress size={20} color="inherit" />
                            Processing Payment...
                          </Box>
                        ) : (
                          `Complete Order - LKR ${total.toLocaleString()}.00`
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </form>

                <Box sx={{ mt: 3, textAlign: "center" }}>
                  <Typography variant="body2" sx={{ color: "#64748b" }}>
                    🔒 Your payment information is secure and encrypted
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default OrderSensor;
