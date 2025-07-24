import { Box, Typography, Tab, Tabs } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { useNotification } from "../../hooks/useNotification";
import StoreTable from "../../components/store/StoreTable";
import StoreDetailsDialog from "../../components/store/StoreDetailsDialog";
import UserSelectionDialog from "../../components/store/UserSelectionDialog";
import FishManagementDialog from "../../components/store/FishManagementDialog";
import FishListDialog from "../../components/store/FishListDialog";
import StoreInfoDialog from "../../components/store/StoreInfoDialog";
import {
  getApprovedStores,
  getPendingStores,
  getRejectedStores,
  getActiveStores,
  getInactiveStores,
  approveStore,
  rejectStore,
  connectUserToAquarium,
  checkStoreHasFish,
  completeStore,
  checkAquariumUser,
  getAquariumUserData,
  getUserById,
  getAquariumFish,
  getStoreInfo,
  updateStoreInfo,
  addStoreInfo,
} from "../../services/storeService";
import type { Store } from "../../types/Store";
import type { AquariumFish } from "../../types/Fish";
import type { StoreInfo } from "../../services/storeService";

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
  const { showSuccess, showError } = useNotification();
  const [tabValue, setTabValue] = useState(0);
  const [approvedStores, setApprovedStores] = useState<Store[]>([]);
  const [pendingStores, setPendingStores] = useState<Store[]>([]);
  const [rejectedStores, setRejectedStores] = useState<Store[]>([]);
  const [activeStores, setActiveStores] = useState<Store[]>([]);
  const [inactiveStores, setInactiveStores] = useState<Store[]>([]);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [userSelectionDialogOpen, setUserSelectionDialogOpen] = useState(false);
  const [storeForUserConnection, setStoreForUserConnection] =
    useState<Store | null>(null);
  const [fishManagementDialogOpen, setFishManagementDialogOpen] =
    useState(false);
  const [storeForFishManagement, setStoreForFishManagement] =
    useState<Store | null>(null);
  const [loading, setLoading] = useState(false);
  const [fishListDialogOpen, setFishListDialogOpen] = useState(false);
  const [fishList, setFishList] = useState<AquariumFish[]>([]);
  const [loadingFish, setLoadingFish] = useState(false);
  const [storeInfoDialogOpen, setStoreInfoDialogOpen] = useState(false);
  const [storeInfo, setStoreInfo] = useState<StoreInfo | null>(null);
  const [loadingStoreInfo, setLoadingStoreInfo] = useState(false);

  const fetchStores = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    try {
      const [approved, pending, rejected, active, inactive] = await Promise.all(
        [
          getApprovedStores(token),
          getPendingStores(token),
          getRejectedStores(token),
          getActiveStores(token),
          getInactiveStores(token),
        ]
      );
      setApprovedStores(approved);
      setPendingStores(pending);
      setRejectedStores(rejected);
      setActiveStores(active);
      setInactiveStores(inactive);
    } catch (error) {
      console.error("Error fetching stores:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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
        setDetailsDialogOpen(false);
        showSuccess(`Store "${store.aquariumName}" approved successfully!`);
      } else {
        showError("Failed to approve store.");
      }
    } catch (error) {
      console.error("Error approving store:", error);
      showError("An error occurred while approving the store.");
    }
  };

  const handleRejectStore = async (store: Store) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const success = await rejectStore(store.id, token);
      if (success) {
        fetchStores(); // Refresh the lists
        setDetailsDialogOpen(false);
        showSuccess(`Store "${store.aquariumName}" rejected successfully!`);
      } else {
        showError("Failed to reject store.");
      }
    } catch (error) {
      console.error("Error rejecting store:", error);
      showError("An error occurred while rejecting the store.");
    }
  };

  const handleConnectUser = async (store: Store) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      // Check if a user is already assigned to this aquarium
      const isUserAssigned = await checkAquariumUser(store.id, token);

      if (isUserAssigned) {
        // Get the user data to show current assignment
        const userData = await getAquariumUserData(store.id, token);
        if (userData) {
          const userDetails = await getUserById(userData.userId, token);
          if (userDetails) {
            const confirmChange = confirm(
              `This aquarium is already assigned to a user.\n\n` +
                `Current Assignment:\n` +
                `Aquarium: ${userData.aquariumName}\n` +
                `User ID: ${userData.userId}\n\n` +
                `Do you want to assign a different user?`
            );

            if (!confirmChange) {
              return;
            }
          }
        }
      }

      // Proceed with user selection
      setStoreForUserConnection(store);
      setUserSelectionDialogOpen(true);
    } catch (error) {
      console.error("Error checking aquarium user:", error);
      showError("An error occurred while checking current user assignment.");
    }
  };

  const handleUserSelected = async (userId: number) => {
    if (!storeForUserConnection) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const success = await connectUserToAquarium(
        userId,
        storeForUserConnection.id,
        token
      );
      if (success) {
        showSuccess(
          `User connected to aquarium "${storeForUserConnection.aquariumName}" successfully!`
        );
      } else {
        showError("Failed to connect user to aquarium.");
      }
    } catch (error) {
      console.error("Error connecting user to aquarium:", error);
      if (error instanceof Error) {
        showError(`Error connecting user: ${error.message}`);
      } else {
        showError("An error occurred while connecting user to aquarium.");
      }
    } finally {
      setUserSelectionDialogOpen(false);
      setStoreForUserConnection(null);
    }
  };

  const handleAddFish = async (store: Store) => {
    setStoreForFishManagement(store);
    setFishManagementDialogOpen(true);
  };

  const handleComplete = async (store: Store) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      // Check if store has users using the new API endpoint
      const hasUsers = await checkAquariumUser(store.id, token);
      if (!hasUsers) {
        showError(
          "Cannot complete aquarium: No user connected to this aquarium. Please connect a user first."
        );
        return;
      }

      // Get user assignment details to show in success message
      const userData = await getAquariumUserData(store.id, token);

      // Check if store has fish
      console.log(`Checking fish for aquarium ID: ${store.id}`);
      const hasFish = await checkStoreHasFish(store.id, token);
      console.log(`Has fish result: ${hasFish}`);

      if (!hasFish) {
        showError(
          `Cannot complete aquarium: No fish added to this aquarium (ID: ${store.id}). Please add fish to the aquarium first.`
        );
        return;
      }

      // Both requirements met, complete the store
      const success = await completeStore(store.id, token);
      if (success) {
        const userInfo = userData
          ? ` (Assigned User ID: ${userData.userId})`
          : "";
        showSuccess(
          `Aquarium "${store.aquariumName}" completed successfully! Status changed to Active.${userInfo}`
        );
        fetchStores(); // Refresh the stores list
      } else {
        showError("Failed to complete aquarium.");
      }
    } catch (error) {
      console.error("Error completing aquarium:", error);
      if (error instanceof Error) {
        showError(`Error completing aquarium: ${error.message}`);
      } else {
        showError("An error occurred while completing the aquarium.");
      }
    }
  };

  const handleViewFish = async (store: Store) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setSelectedStore(store);
    setFishListDialogOpen(true);
    setLoadingFish(true);

    try {
      const fish = await getAquariumFish(store.id, token);
      setFishList(fish);
    } catch (error) {
      console.error("Error fetching fish list:", error);
      showError("Failed to fetch fish list.");
    } finally {
      setLoadingFish(false);
    }
  };

  const handleEditInfo = async (store: Store) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setSelectedStore(store);
    setLoadingStoreInfo(true);

    try {
      const info = await getStoreInfo(store.id, token);
      if (info) {
        setStoreInfo(info);
        setStoreInfoDialogOpen(true); // Open dialog only if info is available
      } else {
        showError("No store information available for this aquarium. Please add it first.");
      }
    } catch (error) {
      console.error("Error fetching store info:", error);
      showError("Failed to fetch store info.");
    } finally {
      setLoadingStoreInfo(false);
    }
  };

  const handleSaveStoreInfo = async (info: StoreInfo) => {
    const token = localStorage.getItem("token");
    if (!token || !selectedStore) return;

    try {
      // Always call updateStoreInfo, assuming the record exists or the backend handles upsert
      const success = await updateStoreInfo(info.id!, info, token);

      if (success) {
        showSuccess("Store information saved successfully!");
        setStoreInfoDialogOpen(false);
      } else {
        showError("Failed to save store information.");
      }
    } catch (error) {
      console.error("Error saving store info:", error);
      showError("An error occurred while saving the store information.");
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
          Store Management
        </Typography>
        
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="store management tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label={`Approved (${approvedStores.length})`} />
          <Tab label={`Pending (${pendingStores.length})`} />
          <Tab label={`Rejected (${rejectedStores.length})`} />
          <Tab label={`Active (${activeStores.length})`} />
          <Tab label={`Inactive (${inactiveStores.length})`} />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <StoreTable
          stores={approvedStores}
          onViewDetails={handleViewStoreDetails}
          onConnectUser={handleConnectUser}
          onAddFish={handleAddFish}
          onComplete={handleComplete}
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
      <TabPanel value={tabValue} index={2}>
        <StoreTable
          stores={rejectedStores}
          onViewDetails={handleViewStoreDetails}
          showActions={true}
          onApprove={handleApproveStore}
          loading={loading}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <StoreTable
          stores={activeStores}
          onViewDetails={handleViewStoreDetails}
          onViewFish={handleViewFish}
          onEditInfo={handleEditInfo}
          loading={loading}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={4}>
        <StoreTable
          stores={inactiveStores}
          onViewDetails={handleViewStoreDetails}
          loading={loading}
        />
      </TabPanel>

      {selectedStore && (
        <StoreDetailsDialog
          open={detailsDialogOpen}
          onClose={() => setDetailsDialogOpen(false)}
          store={selectedStore}
          onApprove={handleApproveStore}
          onReject={handleRejectStore}
        />
      )}

      <UserSelectionDialog
        open={userSelectionDialogOpen}
        onClose={() => {
          setUserSelectionDialogOpen(false);
          setStoreForUserConnection(null);
        }}
        onSelect={handleUserSelected}
        title={
          storeForUserConnection
            ? `Connect Store Admin to ${storeForUserConnection.aquariumName}`
            : "Select Store Admin to Connect"
        }
        currentAquariumId={storeForUserConnection?.id}
      />

      <FishManagementDialog
        open={fishManagementDialogOpen}
        onClose={() => {
          setFishManagementDialogOpen(false);
          setStoreForFishManagement(null);
        }}
        aquariumId={storeForFishManagement?.id || 0}
        aquariumName={storeForFishManagement?.aquariumName || ""}
      />

      {selectedStore && (
        <FishListDialog
          open={fishListDialogOpen}
          onClose={() => setFishListDialogOpen(false)}
          fish={fishList}
          loading={loadingFish}
          aquariumName={selectedStore.aquariumName}
        />
      )}

      {selectedStore && (
        <StoreInfoDialog
          open={storeInfoDialogOpen}
          onClose={() => setStoreInfoDialogOpen(false)}
          storeInfo={storeInfo}
          onSave={handleSaveStoreInfo}
          loading={loadingStoreInfo}
          aquariumId={selectedStore.id}
        />
      )}
    </Box>
  );
};

export default StoreManagement;
