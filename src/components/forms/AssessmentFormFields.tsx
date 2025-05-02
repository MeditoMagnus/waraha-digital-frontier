
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from './FileUpload';

// Define the form schema for reusability
export const assessmentFormSchema = z.object({
  name: z.string().min(2, { message: "Name is required and must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  companyName: z.string().min(2, { message: "Company name is required." }),
  description: z.string().min(10, { message: "Please provide a detailed description of your needs." }),
});

export type AssessmentFormValues = z.infer<typeof assessmentFormSchema>;

interface AssessmentFormFieldsProps {
  form: UseFormReturn<AssessmentFormValues>;
  fileUploadProps: {
    file: File | null;
    fileError: string | null;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    clearFile: () => void;
  };
}

const AssessmentFormFields = ({ form, fileUploadProps }: AssessmentFormFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Your Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Email Address</FormLabel>
              <FormControl>
                <Input placeholder="your.email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={form.control}
        name="companyName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Company Name</FormLabel>
            <FormControl>
              <Input placeholder="Your Company Ltd." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Describe Your IT Needs</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Please describe your current IT infrastructure, challenges, and specific areas you'd like us to assess..." 
                className="min-h-[120px]" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FileUpload {...fileUploadProps} />
    </>
  );
};

export default AssessmentFormFields;
