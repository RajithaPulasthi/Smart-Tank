import {
  Box,
  Typography,
  Button,
  Tab,
  Tabs,
  Card,
  CardContent,
  Badge,
} from "@mui/material";
import { useState, useEffect } from "react";
import StoreTable from "../../components/store/StoreTable";
import PendingRequestsDialog from "../../components/store/PendingRequestsDialog";
import StoreDetailsDialog from "../../components/store/StoreDetailsDialog";
import {
  getApprovedStores,
  getPendingStores,
  approveStore,
  rejectStore,
} from "../../services/storeService";
import type { Store } from "../../types/Store";

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
      id={`store-tabpanel-${index}`}
      aria-labelledby={`store-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const StoreManagement = () => {
  const [tabValue, setTabValue] = useState(0);
  const [approvedStores, setApprovedStores] = useState<Store[]>([]);
  const [pendingStores, setPendingStores] = useState<Store[]>([]);
  const [pendingDialogOpen, setPendingDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchStores = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    try {
      const [approved, pending] = await Promise.all([
        getApprovedStores(token),
        getPendingStores(token),
      ]);
      setApprovedStores(approved);
      setPendingStores(pending);
    } catch (error) {
      console.error("Error fetching stores:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleViewPendingRequests = () => {
    setPendingDialogOpen(true);
  };

  const handleViewStoreDetails = (store: Store) => {
    setSelectedStore(store);
    setDetailsDialogOpen(true);
  };

  const handleApproveStore = async (store: Store) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const success = await approveStore(store.id, token);
      if (success) {
        fetchStores(); // Refresh the lists
        setPendingDialogOpen(false);
        setDetailsDialogOpen(false);
        alert("Store approved successfully!");
      } else {
        alert("Failed to approve store");
      }
    } catch (error) {
      console.error("Error approving store:", error);
      alert("Error approving store");
    }
  };

  const handleRejectStore = async (store: Store) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const success = await rejectStore(store.id, token);
      if (success) {
        fetchStores(); // Refresh the lists
        setPendingDialogOpen(false);
        setDetailsDialogOpen(false);
        alert("Store rejected successfully!");
      } else {
        alert("Failed to reject store");
      }
    } catch (error) {
      console.error("Error rejecting store:", error);
      alert("Error rejecting store");
    }
  };

  return (
    <Box p={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          Store Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleViewPendingRequests}
          disabled={loading}
        >
          <Badge badgeContent={pendingStores.length} color="error">
            View Pending Requests
          </Badge>
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Box display="flex" gap={2} mb={3}>
        <Card sx={{ minWidth: 200 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Approved Stores
            </Typography>
            <Typography variant="h4" color="success.main">
              {approvedStores.length}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 200 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Pending Requests
            </Typography>
            <Typography variant="h4" color="warning.main">
              {pendingStores.length}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label={`Approved Stores (${approvedStores.length})`} />
          <Tab label={`Pending Stores (${pendingStores.length})`} />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <StoreTable
          stores={approvedStores}
          onViewDetails={handleViewStoreDetails}
          showActions={false}
          loading={loading}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <StoreTable
          stores={pendingStores}
          onViewDetails={handleViewStoreDetails}
          showActions={true}
          onApprove={handleApproveStore}
          onReject={handleRejectStore}
          loading={loading}
        />
      </TabPanel>

      {/* Pending Requests Dialog */}
      <PendingRequestsDialog
        open={pendingDialogOpen}
        onClose={() => setPendingDialogOpen(false)}
        pendingStores={pendingStores}
        onViewDetails={handleViewStoreDetails}
        onApprove={handleApproveStore}
        onReject={handleRejectStore}
      />

      {/* Store Details Dialog */}
      <StoreDetailsDialog
        open={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
        store={selectedStore}
        onApprove={handleApproveStore}
        onReject={handleRejectStore}
        showActions={selectedStore?.status === "PENDING"}
      />
    </Box>
  );
};

export default StoreManagement;
