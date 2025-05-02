
import React from 'react';
import { Paperclip, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";

interface FileUploadProps {
  file: File | null;
  fileError: string | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearFile: () => void;
}

const FileUpload = ({ file, fileError, handleFileChange, clearFile }: FileUploadProps) => {
  return (
    <div className="space-y-2">
      <FormLabel className="text-white">Attach Relevant Document (Optional)</FormLabel>
      <div className="flex items-center gap-2">
        {!file ? (
          <>
            <Button
              type="button"
              variant="outline"
              className="relative bg-background/50"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <Paperclip className="mr-2 h-4 w-4" />
              Attach File
              <Input
                id="file-upload"
                type="file"
                className="sr-only"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
              />
            </Button>
            <span className="text-xs text-gray-300">Max size: 5MB (PDF, DOC, DOCX, TXT)</span>
          </>
        ) : (
          <div className="flex items-center gap-2 bg-background/30 text-white p-2 rounded-md">
            <Paperclip className="h-4 w-4" />
            <span className="text-sm truncate max-w-[200px]">{file.name}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={clearFile}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      {fileError && <p className="text-red-500 text-xs mt-1">{fileError}</p>}
    </div>
  );
};

export default FileUpload;
