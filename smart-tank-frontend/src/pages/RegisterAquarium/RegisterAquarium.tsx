import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Typography,
} from "@mui/material";
import SmartTextInput from "../../shared/components/atoms/smartTextInput";
import SmartFileUpload from "../../shared/components/atoms/SmartFileUpload";
import SmartNavbar from "../../shared/components/organisms/smartNavbar";
import SmartFooter from "../../shared/components/organisms/smartFooter/SmartFooter";

const RegisterAquarium = () => {
  return (
    <>
      <SmartNavbar />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Register Your Aquarium
        </Typography>

        {/* Section: Personal Information */}
        <Typography fontWeight={600} sx={{ mt: 4, mb: 2 }}>
          Personal Information
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Box sx={{ flex: "1 1 100%" }}>
            <SmartTextInput label="Your Full Name" fullWidth />
          </Box>
          <Box sx={{ flex: "1 1 calc(50% - 8px)" }}>
            <SmartTextInput label="Contact Number" fullWidth />
          </Box>
          <Box sx={{ flex: "1 1 calc(50% - 8px)" }}>
            <SmartTextInput label="Email Address" fullWidth />
          </Box>
        </Box>

        {/* Section: Store Details */}
        <Typography fontWeight={600} sx={{ mt: 4, mb: 2 }}>
          Store Details
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Box sx={{ flex: "1 1 calc(50% - 8px)" }}>
            <SmartTextInput label="Business Name" fullWidth />
          </Box>
          <Box sx={{ flex: "1 1 calc(50% - 8px)" }}>
            <SmartTextInput label="Business Registration Number" fullWidth />
          </Box>
          <Box sx={{ flex: "1 1 100%" }}>
            <SmartTextInput label="Address Line 1" fullWidth />
          </Box>
          <Box sx={{ flex: "1 1 100%" }}>
            <SmartTextInput label="Address Line 2 (Optional)" fullWidth />
          </Box>
          <Box sx={{ flex: "1 1 calc(50% - 8px)" }}>
            <SmartTextInput label="Province" fullWidth />
          </Box>
          <Box sx={{ flex: "1 1 calc(50% - 8px)" }}>
            <SmartTextInput label="Postal Code" fullWidth />
          </Box>
        </Box>

        {/* Section: Document Upload */}
        <Typography fontWeight={600} sx={{ mt: 4, mb: 2 }}>
          Document Upload
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Box sx={{ flex: "1 1 calc(50% - 8px)" }}>
            <SmartFileUpload label="National ID or Passport" />
          </Box>
          <Box sx={{ flex: "1 1 calc(50% - 8px)" }}>
            <SmartFileUpload label="Proof of Address (utility bill, etc.)" />
          </Box>
          <Box sx={{ flex: "1 1 calc(50% - 8px)" }}>
            <SmartFileUpload label="Selling Fish List" />
          </Box>
          <Box sx={{ flex: "1 1 calc(50% - 8px)" }}>
            <SmartFileUpload label="Other Items (Accessories, Fish Food, etc.)" />
          </Box>
        </Box>

        {/* Section: Confirmation */}
        <Typography fontWeight={600} sx={{ mt: 4, mb: 2 }}>
          Document Upload
        </Typography>
        <Box>
          <FormControlLabel
            control={<Checkbox />}
            label={
              <Typography>
                I agree to the <u>Terms & Conditions</u> and{" "}
                <u>Privacy Policy</u>.
              </Typography>
            }
          />
          <FormControlLabel
            control={<Checkbox />}
            label="I confirm that the information provided is accurate and up to date."
          />
        </Box>

        {/* Submit Button */}
        <Button variant="contained" color="primary" sx={{ mt: 3 }}>
          Submit
        </Button>
      </Container>
      <SmartFooter />
    </>
  );
};

export default RegisterAquarium;
