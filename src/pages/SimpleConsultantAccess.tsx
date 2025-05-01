
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

// Define the access form schema
const accessFormSchema = z.object({
  email: z.string()
    .email("Please enter a valid email")
    .refine((email) => {
      const emailDomain = email.split('@')[1];
      const consumerDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com'];
      return !consumerDomains.includes(emailDomain);
    }, { message: "Please use your company email address" }),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  companySize: z.string().min(1, "Please select your company size")
});

type AccessFormValues = z.infer<typeof accessFormSchema>;

const SimpleConsultantAccess = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AccessFormValues>({
    resolver: zodResolver(accessFormSchema),
    defaultValues: {
      email: '',
      companyName: '',
      companySize: ''
    }
  });

  const onSubmit = (values: AccessFormValues) => {
    setIsSubmitting(true);
    
    // Store the user details in localStorage
    localStorage.setItem('userEmail', values.email);
    localStorage.setItem('userName', values.email.split('@')[0]);
    localStorage.setItem('companyName', values.companyName);
    localStorage.setItem('companySize', values.companySize);
    
    // Show success toast
    toast({
      title: "Access Granted",
      description: "Welcome to our AI Technical Consultant!",
    });
    
    // Navigate to the presales consultancy page
    setTimeout(() => {
      navigate('/presales-consultancy');
    }, 500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Waraha Group
        </Link>
      </div>
      
      <div className="max-w-2xl mx-auto my-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl">AI Technical Consultant Access</CardTitle>
            <CardDescription>
              Get expert advice on software, IT services, architecture, pricing, configurations, or any technical query.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 bg-blue-50 border border-blue-100 rounded-lg p-4 text-blue-800">
              <h3 className="text-lg font-medium mb-2">How Our AI Technical Consultant Can Help You</h3>
              <p className="mb-2">Our AI-powered consultant specializes in providing instant technical expertise for:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Software architecture recommendations</li>
                <li>Technology stack selection guidance</li>
                <li>Integration solutions between systems</li>
                <li>IT infrastructure planning and optimization</li>
                <li>Cloud migration strategies</li>
                <li>Cost estimations for technical projects</li>
                <li>Security implementation advice</li>
                <li>And much more - anything under the sky!</li>
              </ul>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="you@yourcompany.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Corporation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companySize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Size</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">51-200 employees</SelectItem>
                          <SelectItem value="201-500">201-500 employees</SelectItem>
                          <SelectItem value="501-1000">501-1000 employees</SelectItem>
                          <SelectItem value="1001+">1001+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Access AI Consultant"}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              We respect your privacy. Your information will only be used to provide you with better service.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SimpleConsultantAccess;
