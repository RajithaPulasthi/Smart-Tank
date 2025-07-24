import { Paper, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type UserSearchProps = {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder: string;
};

const UserSearch = ({
  searchTerm,
  onSearchChange,
  placeholder,
}: UserSearchProps) => {
  return (
    <Paper
      sx={{
        p: 2,
        mb: 3,
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <TextField
        label={placeholder}
        variant="outlined"
        size="small"
        sx={{ flexGrow: 1, minWidth: 280 }}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Paper>
  );
};

export default UserSearch;
