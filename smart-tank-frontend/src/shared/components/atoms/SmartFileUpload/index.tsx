import { Box, Typography, Button } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const SmartFileUpload = ({ label }: { label: string }) => {
  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: 2,
        textAlign: "center",
        p: 3,
        height: 130,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <UploadFileIcon fontSize="large" color="disabled" />
      <Typography variant="body2" sx={{ mt: 1 }}>
        {label}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Click to upload <br /> PNG, JPG or PDF (max 5 mb)
      </Typography>
      <Button component="label" sx={{ display: "none" }}>
        <input type="file" hidden />
      </Button>
    </Box>
  );
};

export default SmartFileUpload;
