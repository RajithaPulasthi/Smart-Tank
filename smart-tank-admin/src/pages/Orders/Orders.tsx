import { Box, Typography, Tab, Tabs } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { useNotification } from "../../hooks/useNotification";
import PaymentTable from "../../components/orders/PaymentTable";
import {
  getAllPayments,
  getPendingPayments,
  getApprovedPayments,
  getRejectedPayments,
  updatePaymentStatus,
} from "../../services/paymentService";
import type { Payment } from "../../types/Payment";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`payment-tabpanel-${index}`}
      aria-labelledby={`payment-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Orders = () => {
  const { showSuccess, showError } = useNotification();
  const [tabValue, setTabValue] = useState(0);
  const [allPayments, setAllPayments] = useState<Payment[]>([]);
  const [pendingPayments, setPendingPayments] = useState<Payment[]>([]);
  const [approvedPayments, setApprovedPayments] = useState<Payment[]>([]);
  const [rejectedPayments, setRejectedPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPayments = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    try {
      const [all, pending, approved, rejected] = await Promise.all([
        getAllPayments(token),
        getPendingPayments(token),
        getApprovedPayments(token),
        getRejectedPayments(token),
      ]);

      setAllPayments(all);
      setPendingPayments(pending);
      setApprovedPayments(approved);
      setRejectedPayments(rejected);
    } catch (error) {
      console.error("Error fetching payments:", error);
      showError("Failed to fetch payments. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleApprovePayment = async (payment: Payment) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Get current user info for verification
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      showError("User authentication required. Please login again.");
      return;
    }

    try {
      const user = JSON.parse(currentUser);

      // Show confirmation dialog with user verification
      const confirmed = confirm(
        `Are you sure you want to approve this payment?\n\n` +
          `Payment ID: #${payment.id}\n` +
          `Customer: ${payment.billingName}\n` +
          `Service: ${payment.service}\n` +
          `Amount: LKR ${payment.amount.toLocaleString()}\n\n` +
          `Logged in as: ${user.firstName} ${user.lastName} (${user.email})\n\n` +
          `Click OK to approve or Cancel to abort.`
      );

      if (!confirmed) {
        return;
      }

      const success = await updatePaymentStatus(payment.id, "Approved", token);
      if (success) {
        showSuccess(
          `Payment #${payment.id} for ${payment.billingName} approved successfully!`
        );
        fetchPayments(); // Refresh the payments list
      } else {
        showError("Failed to approve payment.");
      }
    } catch (error) {
      console.error("Error approving payment:", error);
      if (error instanceof Error) {
        showError(`Error approving payment: ${error.message}`);
      } else {
        showError("An error occurred while approving the payment.");
      }
    }
  };

  const handleRejectPayment = async (payment: Payment) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Get current user info for verification
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      showError("User authentication required. Please login again.");
      return;
    }

    try {
      const user = JSON.parse(currentUser);

      // Show confirmation dialog with user verification
      const confirmed = confirm(
        `Are you sure you want to reject this payment?\n\n` +
          `Payment ID: #${payment.id}\n` +
          `Customer: ${payment.billingName}\n` +
          `Service: ${payment.service}\n` +
          `Amount: LKR ${payment.amount.toLocaleString()}\n\n` +
          `Logged in as: ${user.firstName} ${user.lastName} (${user.email})\n\n` +
          `Click OK to reject or Cancel to abort.`
      );

      if (!confirmed) {
        return;
      }

      const success = await updatePaymentStatus(payment.id, "Rejected", token);
      if (success) {
        showSuccess(
          `Payment #${payment.id} for ${payment.billingName} rejected successfully!`
        );
        fetchPayments(); // Refresh the payments list
      } else {
        showError("Failed to reject payment.");
      }
    } catch (error) {
      console.error("Error rejecting payment:", error);
      if (error instanceof Error) {
        showError(`Error rejecting payment: ${error.message}`);
      } else {
        showError("An error occurred while rejecting the payment.");
      }
    }
  };

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Orders & Payments Management
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="payment management tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label={`All Payments (${allPayments.length})`} />
          <Tab label={`Pending (${pendingPayments.length})`} />
          <Tab label={`Approved (${approvedPayments.length})`} />
          <Tab label={`Rejected (${rejectedPayments.length})`} />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <PaymentTable payments={allPayments} loading={loading} />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <PaymentTable
          payments={pendingPayments}
          onApprove={handleApprovePayment}
          onReject={handleRejectPayment}
          showActions={true}
          loading={loading}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <PaymentTable payments={approvedPayments} loading={loading} />
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <PaymentTable payments={rejectedPayments} loading={loading} />
      </TabPanel>
    </Box>
  );
};

export default Orders;
