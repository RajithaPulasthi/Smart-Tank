import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Alert,
  CircularProgress,
  Paper,
  Divider,
  Button,
} from "@mui/material";
import {
  Receipt,
  CreditCard,
  CalendarToday,
  ArrowBack,
  ShoppingCart,
  Payment,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthService from "../../services/authService";

interface Payment {
  id: number;
  billingName: string;
  billingAddress: string;
  billingEmail: string;
  billingPhone: string;
  service: string;
  paymentMethod: string;
  amount: number;
  paymentDate: string;
  status?: string;
}

const OrderHistory = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check authentication
    if (!AuthService.isAuthenticated()) {
      navigate("/signin");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Demo order history data
        const demoOrders: Payment[] = [
          {
            id: 1,
            service: "Smart Water Monitor Pro",
            amount: 15000,
            paymentMethod: "Credit Card",
            billingName: "John Smith",
            billingEmail: "john.smith@email.com",
            billingPhone: "+94 77 123 4567",
            billingAddress: "123 Ocean Drive, Colombo 03",
            paymentDate: "2025-07-01T10:00:00Z",
            status: "COMPLETED",
          },
          {
            id: 2,
            service: "AquaSense Basic",
            amount: 8500,
            paymentMethod: "Credit Card",
            billingName: "John Smith",
            billingEmail: "john.smith@email.com",
            billingPhone: "+94 77 123 4567",
            billingAddress: "123 Ocean Drive, Colombo 03",
            paymentDate: "2025-07-15T14:30:00Z",
            status: "COMPLETED",
          },
          {
            id: 3,
            service: "Compact Tank Monitor",
            amount: 6500,
            paymentMethod: "Credit Card",
            billingName: "John Smith",
            billingEmail: "john.smith@email.com",
            billingPhone: "+94 77 123 4567",
            billingAddress: "123 Ocean Drive, Colombo 03",
            paymentDate: "2025-07-25T09:15:00Z",
            status: "SHIPPED",
          },
        ];

        console.log("Demo: Order history loaded", demoOrders);
        setPayments(demoOrders);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load order history."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return `LKR ${amount.toLocaleString()}.00`;
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "success":
        return "success";
      case "pending":
        return "warning";
      case "failed":
      case "cancelled":
        return "error";
      default:
        return "success"; // Default to success for completed payments
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case "credit card":
        return <CreditCard sx={{ fontSize: 20 }} />;
      default:
        return <Payment sx={{ fontSize: 20 }} />;
    }
  };

  if (loading) {
    return (
      <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh", py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress size={40} />
          </Box>
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
            onClick={() => navigate("/")}
            sx={{ mb: 2, color: "#64748b" }}
          >
            Back to Home
          </Button>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <Receipt sx={{ fontSize: 32, color: "#0077ff" }} />
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#1e293b" }}
            >
              Order History
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ color: "#64748b" }}>
            View your past orders and payment details
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {/* Order Summary Stats */}
        <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 4,
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: "#0077ff" }}
              >
                {payments.length}
              </Typography>
              <Typography variant="body2" sx={{ color: "#64748b" }}>
                Total Orders
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: "#00c851" }}
              >
                {formatCurrency(
                  payments.reduce((sum, payment) => sum + payment.amount, 0)
                )}
              </Typography>
              <Typography variant="body2" sx={{ color: "#64748b" }}>
                Total Spent
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: "#ff6b35" }}
              >
                {
                  payments.filter((p) => p.service === "Smart Tank Sensor")
                    .length
                }
              </Typography>
              <Typography variant="body2" sx={{ color: "#64748b" }}>
                Sensor Orders
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Orders List */}
        {payments.length === 0 ? (
          <Card sx={{ textAlign: "center", p: 8 }}>
            <ShoppingCart sx={{ fontSize: 80, color: "#94a3b8", mb: 3 }} />
            <Typography
              variant="h5"
              sx={{ mb: 2, fontWeight: "bold", color: "#64748b" }}
            >
              No Orders Found
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: "#94a3b8" }}>
              You haven't made any purchases yet. Explore our products to get
              started!
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/smart-sensor")}
              sx={{
                background: "linear-gradient(45deg, #00c0ff, #0077ff)",
                px: 4,
                py: 1.5,
              }}
            >
              Shop Smart Sensors
            </Button>
          </Card>
        ) : (
          <Box sx={{ space: 3 }}>
            {payments.map((payment) => (
              <Card
                key={payment.id}
                elevation={2}
                sx={{ mb: 3, borderRadius: 3 }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      display: { xs: "block", md: "flex" },
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 3,
                    }}
                  >
                    {/* Order Details */}
                    <Box sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mb: 2,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold", color: "#1e293b" }}
                        >
                          Order #{payment.id}
                        </Typography>
                        <Chip
                          label="Completed"
                          color={getStatusColor(payment.status)}
                          size="small"
                        />
                      </Box>

                      <Typography
                        variant="h5"
                        sx={{ mb: 2, fontWeight: "bold", color: "#0077ff" }}
                      >
                        {payment.service}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          mb: 3,
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <CalendarToday
                            sx={{ fontSize: 16, color: "#64748b" }}
                          />
                          <Typography variant="body2" sx={{ color: "#64748b" }}>
                            {formatDate(payment.paymentDate)}
                          </Typography>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          {getPaymentMethodIcon(payment.paymentMethod)}
                          <Typography variant="body2" sx={{ color: "#64748b" }}>
                            {payment.paymentMethod}
                          </Typography>
                        </Box>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      {/* Billing Details */}
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "bold", mb: 1, color: "#1e293b" }}
                        >
                          Billing Information
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#64748b", mb: 0.5 }}
                        >
                          <strong>Name:</strong> {payment.billingName}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#64748b", mb: 0.5 }}
                        >
                          <strong>Email:</strong> {payment.billingEmail}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#64748b", mb: 0.5 }}
                        >
                          <strong>Phone:</strong> {payment.billingPhone}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#64748b" }}>
                          <strong>Address:</strong> {payment.billingAddress}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Amount */}
                    <Box
                      sx={{
                        textAlign: { xs: "left", md: "right" },
                        mt: { xs: 3, md: 0 },
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: "bold", color: "#00c851" }}
                      >
                        {formatCurrency(payment.amount)}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#64748b" }}>
                        Total Amount
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default OrderHistory;
