import { Box, InputBase, Paper, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SmartAquariumSearchBar = ({
  value,
  onChange,
  onSubmit,
  placeholder = "Enter aquarium name",
}: {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}) => {
  return (
    <Box sx={{ my: 4, display: "flex", justifyContent: "center" }}>
      <Paper
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        sx={{
          p: "4px 8px",
          display: "flex",
          alignItems: "center",
          borderRadius: "50px", // Fully rounded ends
          width: { xs: "90%", sm: 500, md: 600 }, // Responsive width
          background: "rgba(255, 255, 255, 0.1)", // Glassmorphism background
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.15)",
          transition: "all 0.3s ease",
          "&:hover": {
            background: "rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.25)",
          },
        }}
      >
        <InputBase
          sx={{ ml: 2, flex: 1, color: "text.primary", fontSize: "1.1rem" }}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          inputProps={{
            "aria-label": "search field",
            style: { fontWeight: 500 },
          }}
        />
        <IconButton
          type="submit"
          sx={{
            p: "12px",
            background: "linear-gradient(45deg, #00c0ff, #0077ff)",
            color: "white",
            "&:hover": {
              background: "linear-gradient(45deg, #0077ff, #004aad)",
            },
          }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default SmartAquariumSearchBar;
