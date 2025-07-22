import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  CloudUpload as CloudUploadIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";
import { useState, useRef } from "react";

interface SmartFileUploadProps {
  label: string;
  accept?: string;
  maxSize?: number; // in MB
  onFileSelect?: (file: File) => void;
}

const SmartFileUpload = ({
  label,
  accept = ".png,.jpg,.jpeg,.pdf",
  maxSize = 5,
  onFileSelect,
}: SmartFileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    setError(null);

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Validate file type
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    const acceptedTypes = accept.split(",").map((type) => type.trim());
    if (!acceptedTypes.includes(fileExtension)) {
      setError(`Please select a valid file type: ${accept}`);
      return;
    }

    setSelectedFile(file);
    setUploading(true);

    // Simulate upload process
    setTimeout(() => {
      setUploading(false);
      if (onFileSelect) {
        onFileSelect(file);
      }
    }, 1500);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragOut = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const getUploadContent = () => {
    if (uploading) {
      return (
        <>
          <CircularProgress size={48} sx={{ color: "primary.main", mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Uploading...
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please wait while we process your file
          </Typography>
        </>
      );
    }

    if (selectedFile && !error) {
      return (
        <>
          <CheckCircleIcon
            sx={{ fontSize: 48, color: "success.main", mb: 2 }}
          />
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, mb: 1, color: "success.main" }}
          >
            File Uploaded Successfully!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {selectedFile.name}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={handleClick}
            sx={{ borderRadius: 2 }}
          >
            Choose Different File
          </Button>
        </>
      );
    }

    return (
      <>
        <CloudUploadIcon
          sx={{
            fontSize: 48,
            color: dragActive ? "primary.main" : "action.active",
            mb: 2,
            transition: "color 0.3s ease",
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 1,
            color: dragActive ? "primary.main" : "text.primary",
          }}
        >
          {label}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {dragActive
            ? "Drop your file here"
            : "Click to upload or drag and drop"}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Supported formats: PNG, JPG, PDF (max {maxSize} MB)
        </Typography>
      </>
    );
  };

  return (
    <Box>
      <Paper
        elevation={dragActive ? 8 : 2}
        sx={{
          border: error
            ? "2px dashed #f44336"
            : dragActive
            ? "2px dashed #1976d2"
            : selectedFile && !uploading
            ? "2px solid #4caf50"
            : "2px dashed #e0e0e0",
          borderRadius: 3,
          textAlign: "center",
          p: 4,
          minHeight: 180,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          cursor: uploading ? "default" : "pointer",
          transition: "all 0.3s ease",
          background: error
            ? "rgba(244, 67, 54, 0.02)"
            : dragActive
            ? "rgba(25, 118, 210, 0.04)"
            : selectedFile && !uploading
            ? "rgba(76, 175, 80, 0.02)"
            : "background.paper",
          "&:hover": uploading
            ? {}
            : {
                borderColor: error ? "#f44336" : "#1976d2",
                backgroundColor: error
                  ? "rgba(244, 67, 54, 0.04)"
                  : "rgba(25, 118, 210, 0.02)",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
              },
        }}
        onClick={uploading ? undefined : handleClick}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {getUploadContent()}

        <input
          ref={inputRef}
          type="file"
          hidden
          accept={accept}
          onChange={handleInputChange}
        />
      </Paper>

      {error && (
        <Alert
          severity="error"
          sx={{ mt: 2, borderRadius: 2 }}
          icon={<ErrorIcon />}
        >
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default SmartFileUpload;
