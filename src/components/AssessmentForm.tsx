
import React, { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Form } from '@/components/ui/form';
import { getCachedFormData, saveCachedFormData } from '@/utils/formCache';
import { useFileUpload } from '@/hooks/useFileUpload';
import AssessmentFormFields, { 
  assessmentFormSchema, 
  AssessmentFormValues 
} from './forms/AssessmentFormFields';
import SubmitButton from './forms/SubmitButton';

const AssessmentForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { file, fileError, handleFileChange, clearFile } = useFileUpload();
  const [cachedData, setCachedData] = useState<ReturnType<typeof getCachedFormData>>({
    email: '',
    userName: '',
    companyName: '',
    companySize: ''
  });

  // Get cached form data on component mount
  useEffect(() => {
    const formData = getCachedFormData();
    setCachedData(formData);
  }, []);

  const form = useForm<AssessmentFormValues>({
    resolver: zodResolver(assessmentFormSchema),
    defaultValues: {
      name: '',
      email: '',
      companyName: '',
      description: '',
    },
  });

  // Update form values when cached data is loaded
  useEffect(() => {
    if (cachedData.userName) {
      form.setValue('name', cachedData.userName);
    }
    if (cachedData.email) {
      form.setValue('email', cachedData.email);
    }
    if (cachedData.companyName) {
      form.setValue('companyName', cachedData.companyName);
    }
  }, [cachedData, form]);

  const onSubmit = async (values: AssessmentFormValues) => {
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
      
      // Cache the form data
      saveCachedFormData({
        email: values.email,
        userName: values.name,
        companyName: values.companyName
      });
      
      // Get the Supabase session
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData?.session?.access_token;
      
      // Submit form data to the edge function with authorization header
      const response = await fetch('https://iympksahhwfpirxtoljs.supabase.co/functions/v1/submit-assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken ? `Bearer ${accessToken}` : '',
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
        <AssessmentFormFields 
          form={form} 
          fileUploadProps={{
            file,
            fileError,
            handleFileChange,
            clearFile
          }}
        />
        
        <SubmitButton 
          isSubmitting={isSubmitting} 
          text="Request One-to-One Assessment" 
          loadingText="Submitting..."
        />
      </form>
    </Form>
  );
};

export default AssessmentForm;
