import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Box,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import {
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import type { Payment } from "../../types/Payment";

interface PaymentTableProps {
  payments: Payment[];
  onApprove?: (payment: Payment) => void;
  onReject?: (payment: Payment) => void;
  showActions?: boolean;
  loading?: boolean;
}

const PaymentTable = ({
  payments,
  onApprove,
  onReject,
  showActions = false,
  loading = false,
}: PaymentTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (payments.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={4}>
        <Typography variant="h6" color="textSecondary">
          No payments found
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Payment ID</TableCell>
            <TableCell>Customer Details</TableCell>
            <TableCell>Service</TableCell>
            <TableCell>Payment Info</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Status</TableCell>
            {showActions && <TableCell align="center">Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id} hover>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  #{payment.id}
                </Typography>
              </TableCell>

              <TableCell>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {payment.billingName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {payment.billingEmail}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {payment.billingPhone}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {payment.billingAddress}
                  </Typography>
                </Box>
              </TableCell>

              <TableCell>
                <Typography variant="body1" fontWeight="medium">
                  {payment.service}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography variant="body2" fontWeight="medium">
                  {payment.paymentMethod}
                </Typography>
              </TableCell>

              <TableCell align="center">
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="primary"
                >
                  {formatAmount(payment.amount)}
                </Typography>
              </TableCell>

              <TableCell align="center">
                <Typography variant="body2">
                  {formatDate(payment.paymentDate)}
                </Typography>
              </TableCell>

              <TableCell align="center">
                <Chip
                  label={payment.status}
                  color={
                    getStatusColor(payment.status) as
                      | "success"
                      | "warning"
                      | "error"
                      | "default"
                  }
                  size="small"
                />
              </TableCell>

              {showActions && (
                <TableCell align="center">
                  <Box display="flex" justifyContent="center" gap={1}>
                    {payment.status === "Pending" && (
                      <>
                        <Tooltip title="Approve Payment">
                          <IconButton
                            size="small"
                            color="success"
                            onClick={() => onApprove?.(payment)}
                          >
                            <ApproveIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Reject Payment">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => onReject?.(payment)}
                          >
                            <RejectIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </Box>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PaymentTable;
