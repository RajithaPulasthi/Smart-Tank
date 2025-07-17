import { Box, Card, CardContent, Typography } from "@mui/material";

interface InfoCardProps {
  iconSrc: string;
  title: string;
  description: string;
}

const SmartInfoCard = ({ iconSrc, title, description }: InfoCardProps) => {
  return (
    <Card
      sx={{
        borderRadius: "12px",
        boxShadow: "none",
        textAlign: "center",
        padding: 2,
        backgroundColor: "#ffffff",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div" fontWeight="bold" gutterBottom>
          {title}
        </Typography>

        <Box
          component="img"
          src={iconSrc}
          alt={title}
          sx={{
            width: 80,
            height: 80,
            mb: 2,
          }}
        />

        <Typography variant="body1" color="text.primary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SmartInfoCard;
