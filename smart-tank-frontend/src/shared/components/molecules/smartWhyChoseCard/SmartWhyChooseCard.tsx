import { Box, Typography } from "@mui/material";

interface SmartWhyChooseCardProps {
  iconSrc: string;
  title: string;
  description: string;
}

const SmartWhyChooseCard = ({
  iconSrc,
  title,
  description,
}: SmartWhyChooseCardProps) => {
  return (
    <Box
      sx={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        color: "#fff",
        borderRadius: 4,
        p: 4,
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 25px 50px rgba(0, 119, 255, 0.2)",
          background: "rgba(255, 255, 255, 0.08)",
          borderColor: "rgba(0, 192, 255, 0.3)",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, #00c0ff, #0077ff)",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            background: "rgba(0, 119, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 80,
            minHeight: 80,
          }}
        >
          <Box
            component="img"
            src={iconSrc}
            alt={title}
            sx={{
              width: 48,
              height: 48,
              filter: "brightness(0) invert(1)",
            }}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              color: "white",
              mb: 2,
              fontSize: "1.2rem",
              lineHeight: 1.3,
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#94a3b8",
              lineHeight: 1.6,
            }}
          >
            {description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SmartWhyChooseCard;
