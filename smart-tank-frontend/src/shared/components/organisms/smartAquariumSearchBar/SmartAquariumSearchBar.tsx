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
          display: "flex",
          alignItems: "center",
          borderRadius: 5,
          width: { xs: "100%", sm: 400 },
          backgroundColor: "#00aaff",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        }}
      >
        <InputBase
          sx={{ ml: 2, flex: 1, color: "#fff" }}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          inputProps={{
            "aria-label": "search field",
            style: { color: "#fff", fontWeight: 500 },
          }}
        />
        <IconButton
          type="submit"
          sx={{ p: 1, color: "white", "&:hover": { color: "#e0f7ff" } }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default SmartAquariumSearchBar;
