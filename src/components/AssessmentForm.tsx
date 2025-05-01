
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Paperclip, X } from 'lucide-react';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required and must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  companyName: z.string().min(2, { message: "Company name is required." }),
  description: z.string().min(10, { message: "Please provide a detailed description of your needs." }),
});

const AssessmentForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      companyName: '',
      description: '',
    },
  });

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      let filePath = null;
      let fileName = null;
      
      // Upload file if provided
      if (file) {
        fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
        const { data: fileData, error: fileError } = await supabase.storage
          .from('assessment_attachments')
          .upload(fileName, file);
          
        if (fileError) {
          throw new Error(`File upload failed: ${fileError.message}`);
        }
        
        filePath = fileData?.path;
      }
      
      // Submit form data to the edge function
      const response = await fetch('https://iympksahhwfpirxtoljs.supabase.co/functions/v1/submit-assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          companyName: values.companyName,
          description: values.description,
          hasAttachment: !!filePath,
          attachmentName: fileName,
        }),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || "Failed to submit assessment request");
      }
      
      // Reset form and show success message
      form.reset();
      setFile(null);
      toast({
        title: "Assessment Request Submitted",
        description: "We'll get back to you shortly with a personalized assessment.",
      });
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        
        <Button
          type="submit"
          className="w-full bg-waraha-gold hover:bg-waraha-gold/90 text-waraha-midnight"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Request One-to-One Assessment"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AssessmentForm;
