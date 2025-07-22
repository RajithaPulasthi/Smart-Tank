import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Typography,
  InputAdornment,
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  Upload as UploadIcon,
  CheckCircle as CheckIcon,
  Store as StoreIcon,
  Assignment as AssignmentIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import { useState } from "react";
import SmartTextInput from "../../shared/components/atoms/smartTextInput";
import SmartFileUpload from "../../shared/components/atoms/SmartFileUpload";
import SmartNavbar from "../../shared/components/organisms/smartNavbar";
import SmartFooter from "../../shared/components/organisms/smartFooter/SmartFooter";

const RegisterAquarium = () => {
  // Form state
  const [formData, setFormData] = useState({
    aquariumName: "",
    location: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    businessName: "",
    businessRegNumber: "",
    address: "",
    province: "",
    postalCode: "",
    agreeToTerms: false,
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      }));
    };

  const isFormValid = () => {
    return (
      formData.aquariumName &&
      formData.location &&
      formData.firstName &&
      formData.lastName &&
      formData.phoneNumber &&
      formData.email &&
      formData.businessName &&
      formData.businessRegNumber &&
      formData.address &&
      formData.province &&
      formData.postalCode &&
      formData.agreeToTerms &&
      uploadedFile // File is required
    );
  };

  const handleSubmit = async () => {
    console.log("Form Data:", formData);
    console.log("Uploaded File:", uploadedFile);

    // Create FormData for multipart/form-data submission
    const formDataToSubmit = new FormData();

    // Add all form fields with exact API field names
    formDataToSubmit.append("AquariumName", formData.aquariumName);
    formDataToSubmit.append("Location", formData.location);
    formDataToSubmit.append("FirstName", formData.firstName);
    formDataToSubmit.append("LastName", formData.lastName);
    formDataToSubmit.append("Email", formData.email);
    formDataToSubmit.append("PhoneNumber", formData.phoneNumber);
    formDataToSubmit.append("BusinessName", formData.businessName);
    formDataToSubmit.append("BusinessRegNumber", formData.businessRegNumber);
    formDataToSubmit.append("Address", formData.address);
    formDataToSubmit.append("Province", formData.province);
    formDataToSubmit.append("PostalCode", formData.postalCode);

    // Add file if present
    if (uploadedFile) {
      formDataToSubmit.append("FishListFile", uploadedFile);
    }

    // Log the FormData entries for debugging
    console.log("FormData entries:");
    for (const [key, value] of formDataToSubmit.entries()) {
      console.log(key, ":", value);
    }

    try {
      // Get authentication token if available
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      
      const headers: HeadersInit = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // Here you would make the API call
      const response = await fetch("http://localhost:8082/api/Aquariums/register-aquarium", {
        method: "POST",
        headers: headers,
        body: formDataToSubmit, // Don't set Content-Type header, browser will set it automatically for FormData
      });

      if (response.ok) {
        const result = await response.json();
        alert("Registration submitted successfully!");
        console.log("API Response:", result);
      } else {
        // Get the error message from the response
        let errorMessage = "Registration failed";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || `Error ${response.status}: ${response.statusText}`;
        } catch {
          errorMessage = `Error ${response.status}: ${response.statusText}`;
        }
        
        if (response.status === 401) {
          errorMessage = "Unauthorized: Please log in first or check your credentials";
        } else if (response.status === 403) {
          errorMessage = "Forbidden: You don't have permission to register an aquarium";
        } else if (response.status === 400) {
          errorMessage = "Bad Request: Please check your form data";
        }
        
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Submission error:", error);
      const errorMessage = error instanceof Error ? error.message : "Registration failed. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <>
      <SmartNavbar />
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: "40vh",
          background: "linear-gradient(135deg, #1F2937 0%, #111827 100%)",
          display: "flex",
          alignItems: "center",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated background elements */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 20% 80%, rgba(0, 192, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)",
            animation: "pulse 4s ease-in-out infinite alternate",
            "@keyframes pulse": {
              "0%": { opacity: 0.5 },
              "100%": { opacity: 0.8 },
            },
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Typography 
            variant="h3" 
            fontWeight="bold" 
            gutterBottom
            sx={{
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              textShadow: "2px 4px 12px rgba(0,0,0,0.8)",
            }}
          >
            Register Your{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(45deg, #00c0ff, #64ffda)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "brightness(1.2)",
              }}
            >
              Aquarium Store
            </Box>
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              opacity: 0.9,
              fontSize: "1.25rem",
              lineHeight: 1.6,
              textShadow: "1px 2px 6px rgba(0,0,0,0.7)",
            }}
          >
            Join our network of trusted aquarium retailers and reach more customers
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(to bottom, #f8fafc 0%, #e2e8f0 100%)",
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography 
              variant="h5" 
              fontWeight="600" 
              gutterBottom
              sx={{ color: "#1F2937" }}
            >
              Complete Your Registration
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ color: "#6B7280", maxWidth: 600, mx: "auto", fontSize: "1.1rem" }}
            >
              Please fill out all required information to register your aquarium store with our platform.
            </Typography>
          </Box>

        {/* Section: Aquarium Details */}
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 4,
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            border: "1px solid #E5E7EB",
            mb: 4,
            overflow: "hidden",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
            },
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(135deg, #00c0ff 0%, #0077ff 100%)",
              color: "white",
              p: 4,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <StoreIcon sx={{ fontSize: 36 }} />
            <Box>
              <Typography variant="h5" fontWeight="bold">
                Aquarium Details
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Information about your aquarium
              </Typography>
            </Box>
          </Box>
          <Box sx={{ p: 4 }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
              <Box sx={{ flex: "1 1 calc(50% - 12px)" }}>
                <SmartTextInput
                  label="Aquarium Name"
                  fullWidth
                  value={formData.aquariumName}
                  onChange={handleInputChange("aquariumName")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <StoreIcon sx={{ color: "#6B7280" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      backgroundColor: "#f9fafb",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: "#f3f4f6",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "white",
                        borderColor: "#00c0ff",
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: "#1F2937",
                      fontSize: "1rem",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#6B7280",
                      "&.Mui-focused": {
                        color: "#00c0ff",
                      },
                    },
                  }}
                />
              </Box>
              <Box sx={{ flex: "1 1 calc(50% - 12px)" }}>
                <SmartTextInput
                  label="Location"
                  fullWidth
                  value={formData.location}
                  onChange={handleInputChange("location")}
                  placeholder="e.g., Homagama, Maharagama, Colombo"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HomeIcon sx={{ color: "#6B7280" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      backgroundColor: "#f9fafb",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: "#f3f4f6",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "white",
                        borderColor: "#00c0ff",
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: "#1F2937",
                      fontSize: "1rem",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#6B7280",
                      "&.Mui-focused": {
                        color: "#00c0ff",
                      },
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Section: Personal Information */}
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 4,
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            border: "1px solid #E5E7EB",
            mb: 4,
            overflow: "hidden",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
            },
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
              color: "white",
              p: 4,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <PersonIcon sx={{ fontSize: 36 }} />
            <Box>
              <Typography variant="h5" fontWeight="bold">
                Personal Information
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Tell us about yourself
              </Typography>
            </Box>
          </Box>
          <Box sx={{ p: 4 }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
              <Box sx={{ flex: "1 1 calc(50% - 12px)" }}>
                <SmartTextInput
                  label="First Name"
                  fullWidth
                  value={formData.firstName}
                  onChange={handleInputChange("firstName")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: "#6B7280" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      backgroundColor: "#f9fafb",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: "#f3f4f6",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "white",
                        borderColor: "#10B981",
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: "#1F2937",
                      fontSize: "1rem",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#6B7280",
                      "&.Mui-focused": {
                        color: "#10B981",
                      },
                    },
                  }}
                />
              </Box>
              <Box sx={{ flex: "1 1 calc(50% - 12px)" }}>
                <SmartTextInput
                  label="Last Name"
                  fullWidth
                  value={formData.lastName}
                  onChange={handleInputChange("lastName")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: "#6B7280" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      backgroundColor: "#f9fafb",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: "#f3f4f6",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "white",
                        borderColor: "#10B981",
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: "#1F2937",
                      fontSize: "1rem",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#6B7280",
                      "&.Mui-focused": {
                        color: "#10B981",
                      },
                    },
                  }}
                />
              </Box>
              <Box sx={{ flex: "1 1 calc(50% - 12px)" }}>
                <SmartTextInput
                  label="Phone Number"
                  fullWidth
                  value={formData.phoneNumber}
                  onChange={handleInputChange("phoneNumber")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon sx={{ color: "#6B7280" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      backgroundColor: "#f9fafb",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: "#f3f4f6",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "white",
                        borderColor: "#10B981",
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: "#1F2937",
                      fontSize: "1rem",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#6B7280",
                      "&.Mui-focused": {
                        color: "#10B981",
                      },
                    },
                  }}
                />
              </Box>
              <Box sx={{ flex: "1 1 calc(50% - 12px)" }}>
                <SmartTextInput
                  label="Email Address"
                  type="email"
                  fullWidth
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: "#6B7280" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      backgroundColor: "#f9fafb",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: "#f3f4f6",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "white",
                        borderColor: "#10B981",
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: "#1F2937",
                      fontSize: "1rem",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#6B7280",
                      "&.Mui-focused": {
                        color: "#10B981",
                      },
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Section: Store Details & Address */}
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 4,
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            border: "1px solid #E5E7EB",
            mb: 4,
            overflow: "hidden",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
            },
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
              color: "white",
              p: 4,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <StoreIcon sx={{ fontSize: 36 }} />
            <Box>
              <Typography variant="h5" fontWeight="bold">
                Store Details & Address
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Information about your aquarium business and location
              </Typography>
            </Box>
          </Box>
          <Box sx={{ p: 4 }}>
            {/* Store Details Row */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 3 }}>
              <Box sx={{ flex: "1 1 calc(50% - 12px)" }}>
                <SmartTextInput
                  label="Business Name"
                  fullWidth
                  value={formData.businessName}
                  onChange={handleInputChange("businessName")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessIcon sx={{ color: "#6B7280" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      backgroundColor: "#f9fafb",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: "#f3f4f6",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "white",
                        borderColor: "#8B5CF6",
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: "#1F2937",
                      fontSize: "1rem",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#6B7280",
                      "&.Mui-focused": {
                        color: "#8B5CF6",
                      },
                    },
                  }}
                />
              </Box>
              <Box sx={{ flex: "1 1 calc(50% - 12px)" }}>
                <SmartTextInput
                  label="Business Registration Number"
                  fullWidth
                  value={formData.businessRegNumber}
                  onChange={handleInputChange("businessRegNumber")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AssignmentIcon sx={{ color: "#6B7280" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      backgroundColor: "#f9fafb",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: "#f3f4f6",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "white",
                        borderColor: "#8B5CF6",
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: "#1F2937",
                      fontSize: "1rem",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#6B7280",
                      "&.Mui-focused": {
                        color: "#8B5CF6",
                      },
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Address Section */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {/* Address Field */}
              <Box>
                <SmartTextInput
                  label="Store Address"
                  fullWidth
                  value={formData.address}
                  onChange={handleInputChange("address")}
                  placeholder="Enter your store's full address"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HomeIcon sx={{ color: "#6B7280" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      backgroundColor: "#f9fafb",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: "#f3f4f6",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "white",
                        borderColor: "#8B5CF6",
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: "#1F2937",
                      fontSize: "1rem",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#6B7280",
                      "&.Mui-focused": {
                        color: "#8B5CF6",
                      },
                    },
                  }}
                />
              </Box>

              {/* Province and Postal Code Row */}
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Box sx={{ flex: 1, minWidth: "280px" }}>
                  <SmartTextInput
                    label="Province"
                    fullWidth
                    value={formData.province}
                    onChange={handleInputChange("province")}
                    placeholder="Enter province name"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        backgroundColor: "#f9fafb",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: "#f3f4f6",
                        },
                        "&.Mui-focused": {
                          backgroundColor: "white",
                          borderColor: "#8B5CF6",
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: "#1F2937",
                        fontSize: "1rem",
                      },
                      "& .MuiInputLabel-root": {
                        color: "#6B7280",
                        "&.Mui-focused": {
                          color: "#8B5CF6",
                        },
                      },
                    }}
                  />
                </Box>
                <Box sx={{ flex: 1, minWidth: "200px" }}>
                  <SmartTextInput
                    label="Postal Code"
                    fullWidth
                    value={formData.postalCode}
                    onChange={handleInputChange("postalCode")}
                    placeholder="Enter postal code"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        backgroundColor: "#f9fafb",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: "#f3f4f6",
                        },
                        "&.Mui-focused": {
                          backgroundColor: "white",
                          borderColor: "#8B5CF6",
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: "#1F2937",
                        fontSize: "1rem",
                      },
                      "& .MuiInputLabel-root": {
                        color: "#6B7280",
                        "&.Mui-focused": {
                          color: "#8B5CF6",
                        },
                      },
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Section: Document Upload */}
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 4,
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            border: "1px solid #E5E7EB",
            mb: 4,
            overflow: "hidden",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
            },
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
              color: "white",
              p: 4,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <UploadIcon sx={{ fontSize: 36 }} />
            <Box>
              <Typography variant="h5" fontWeight="bold">
                Document Upload
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Upload your fish inventory list
              </Typography>
            </Box>
          </Box>
          <Box sx={{ p: 4 }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              <Box sx={{ flex: "1 1 100%" }}>
                <SmartFileUpload
                  label="Selling Fish List"
                  onFileSelect={setUploadedFile}
                  accept=".pdf,.doc,.docx,.txt,.csv,.xlsx"
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Section: Confirmation */}
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 4,
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            border: "1px solid #E5E7EB",
            mb: 4,
            overflow: "hidden",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
            },
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(135deg, #EC4899 0%, #BE185D 100%)",
              color: "white",
              p: 4,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <CheckIcon sx={{ fontSize: 36 }} />
            <Box>
              <Typography variant="h5" fontWeight="bold">
                Confirmation
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Review and confirm your registration
              </Typography>
            </Box>
          </Box>
          <Box sx={{ p: 4 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{ 
                      color: "#EC4899",
                      "&.Mui-checked": {
                        color: "#EC4899",
                      },
                    }}
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange("agreeToTerms")}
                  />
                }
                label={
                  <Typography sx={{ fontSize: "1rem", color: "#374151", lineHeight: 1.6 }}>
                    I agree to the{" "}
                    <Box
                      component="span"
                      sx={{
                        color: "#EC4899",
                        textDecoration: "underline",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      Terms & Conditions
                    </Box>{" "}
                    and{" "}
                    <Box
                      component="span"
                      sx={{
                        color: "#EC4899",
                        textDecoration: "underline",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      Privacy Policy
                    </Box>
                    .
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    sx={{ 
                      color: "#6B7280",
                      "&.Mui-checked": {
                        color: "#EC4899",
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: "1rem", color: "#374151", lineHeight: 1.6 }}>
                    I confirm that the information provided is accurate and up
                    to date.
                  </Typography>
                }
              />
            </Box>
          </Box>
        </Box>

        {/* Submit Button */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 6 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            disabled={!isFormValid()}
            sx={{
              px: 8,
              py: 3,
              borderRadius: 3,
              background: !isFormValid() 
                ? "#D1D5DB" 
                : "linear-gradient(135deg, #00c0ff 0%, #0077ff 100%)",
              boxShadow: !isFormValid() 
                ? "none" 
                : "0 8px 32px rgba(0, 192, 255, 0.3)",
              fontSize: "1.1rem",
              fontWeight: "bold",
              textTransform: "none",
              color: !isFormValid() ? "#9CA3AF" : "white",
              transition: "all 0.3s ease",
              "&:hover": {
                background: !isFormValid() 
                  ? "#D1D5DB" 
                  : "linear-gradient(135deg, #0077ff 0%, #004aad 100%)",
                transform: !isFormValid() ? "none" : "translateY(-2px)",
                boxShadow: !isFormValid() 
                  ? "none" 
                  : "0 12px 40px rgba(0, 192, 255, 0.4)",
              },
              "&:disabled": {
                background: "#D1D5DB",
                color: "#9CA3AF",
                transform: "none",
                boxShadow: "none",
                cursor: "not-allowed",
              },
            }}
          >
            Submit Registration
          </Button>
          {!isFormValid() && (
            <Box 
              sx={{ 
                mt: 3,
                p: 3,
                backgroundColor: "#FEF3C7",
                borderRadius: 3,
                border: "1px solid #FCD34D",
                maxWidth: 600,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "#92400E",
                  textAlign: "center",
                  fontWeight: 500,
                  lineHeight: 1.6,
                }}
              >
                ⚠️ Please complete all required fields including aquarium name, location, 
                personal details, business information, complete address with province 
                and postal code, upload the fish list document, and agree to the terms & conditions
              </Typography>
            </Box>
          )}
        </Box>
        
        </Container>
      </Box>
      <SmartFooter />
    </>
  );
};

export default RegisterAquarium;
