import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setPreviewUrl(reader.result.toString());
          onImageUpload(reader.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const clearSelection = () => {
    setPreviewUrl(null);
    onImageUpload('');
  };

  return (
    <Box>
      <input
        accept="image/*"
        id="image-upload"
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <label htmlFor="image-upload">
        <Button component="span" variant="contained">
          Upload Image
        </Button>
      </label>
      {previewUrl && (
        <Box mt={2}>
          <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
          <Button variant="outlined" onClick={clearSelection}>
            Clear
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ImageUploader;
