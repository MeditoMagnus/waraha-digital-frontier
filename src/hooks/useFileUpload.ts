
import { useState } from 'react';

export const useFileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const selectedFile = e.target.files?.[0];
    
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setFileError("File size must be less than 5MB");
        setFile(null);
        return;
      }
      
      // Validate file type (PDF, DOC, DOCX, TXT)
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      if (!validTypes.includes(selectedFile.type)) {
        setFileError("Only PDF, DOC, DOCX and TXT files are allowed");
        setFile(null);
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const clearFile = () => {
    setFile(null);
    setFileError(null);
  };

  return { file, fileError, handleFileChange, clearFile };
};
