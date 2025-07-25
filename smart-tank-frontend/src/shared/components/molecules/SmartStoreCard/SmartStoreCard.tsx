import { Box, Typography } from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import SmartButton from "../../atoms/SmartButtons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import StoreImage from "../../../../assets/StoreImage.png";
import aquariumService from "../../../../services/aquariumService";

export interface SmartStoreCardProps {
  id: number;
  aquariumName: string;
  onExploreClick?: () => void;
}

const SmartStoreCard = ({
  id,
  aquariumName,
  onExploreClick,
}: SmartStoreCardProps) => {
  const navigate = useNavigate();
  const [shopAddress, setShopAddress] = useState<string>("");

  useEffect(() => {
    const fetchShopInfo = async () => {
      try {
        const shopInfo = await aquariumService.getAquariumShopInfo(id);
        setShopAddress(shopInfo.shopAddress);
      } catch (error) {
        console.error("Error fetching shop info:", error);
        setShopAddress("Address not available");
      }
    };

    fetchShopInfo();
  }, [id]);

  const handleNavigate = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      navigate(`/aquarium/${id}`);
    }
  };
  return (
    <Box
      sx={{
        width: 320,
        borderRadius: 4,
        overflow: "hidden",
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        position: "relative",
        "&:hover": {
          transform: "translateY(-12px)",
          boxShadow: "0 16px 60px 0 rgba(0, 192, 255, 0.4)",
          background: "rgba(255, 255, 255, 0.12)",
        },
      }}
    >
      {/* Image */}
      <Box
        component="img"
        src={StoreImage}
        alt={aquariumName}
        sx={{
          width: "100%",
          height: 200,
          objectFit: "cover",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      />

      {/* Content */}
      <Box
        sx={{
          p: 3,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              mb: 1,
              fontSize: "1.2rem",
              lineHeight: 1.3,
              textAlign: "center",
            }}
          >
            {aquariumName}
          </Typography>

          {shopAddress && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <LocationOn sx={{ fontSize: 16, opacity: 0.7, mr: 0.5 }} />
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.8,
                  fontSize: "0.875rem",
                  textAlign: "center",
                }}
              >
                {shopAddress}
              </Typography>
            </Box>
          )}
        </Box>

        <SmartButton
          text="Explore Store"
          type="button"
          onClick={handleNavigate}
          fullWidth
        />
      </Box>
    </Box>
  );
};

export default SmartStoreCard;
