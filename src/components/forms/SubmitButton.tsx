
import React from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  isSubmitting: boolean;
  text: string;
  loadingText: string;
  className?: string;
}

const SubmitButton = ({ 
  isSubmitting, 
  text, 
  loadingText,
  className = "w-full bg-waraha-gold hover:bg-waraha-gold/90 text-waraha-midnight"
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      className={className}
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        text
      )}
    </Button>
  );
};

export default SubmitButton;
