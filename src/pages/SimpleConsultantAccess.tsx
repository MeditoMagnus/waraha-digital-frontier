
import React, { useState, useEffect } from 'react';
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
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { getCachedFormData, saveCachedFormData } from '@/utils/formCache';
import { Computer, LandmarkIcon, SearchIcon, ShieldCheck, Building2Icon } from 'lucide-react';

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

  const form = useForm<AccessFormValues>({
    resolver: zodResolver(accessFormSchema),
    defaultValues: {
      email: cachedData.email || '',
      companyName: cachedData.companyName || '',
      companySize: cachedData.companySize || ''
    }
  });

  // Update form values when cached data is loaded
  useEffect(() => {
    if (cachedData.email) {
      form.setValue('email', cachedData.email);
    }
    if (cachedData.companyName) {
      form.setValue('companyName', cachedData.companyName);
    }
    if (cachedData.companySize) {
      form.setValue('companySize', cachedData.companySize);
    }
  }, [cachedData, form]);

  const onSubmit = (values: AccessFormValues) => {
    setIsSubmitting(true);
    
    // Store the user details using our utility function
    saveCachedFormData({
      email: values.email,
      userName: values.email.split('@')[0],
      companyName: values.companyName,
      companySize: values.companySize
    });
    
    // Show success toast
    toast({
      title: "Access Granted",
      description: "Welcome to our Multi-Domain AI Consultants!",
    });
    
    // Navigate to the presales consultancy page
    setTimeout(() => {
      navigate('/presales-consultancy');
    }, 500);
  };

  const consultancyDomains = [
    {
      name: "IT Consultancy",
      icon: <Computer className="h-8 w-8" />,
      description: "Expert advice on software, hardware, cloud infrastructure, cybersecurity, and digital transformation."
    },
    {
      name: "Taxation Services",
      icon: <LandmarkIcon className="h-8 w-8" />,
      description: "Guidance on UAE VAT, corporate tax, compliance, registration, filing, and optimization strategies."
    },
    {
      name: "Auditing Services",
      icon: <SearchIcon className="h-8 w-8" />,
      description: "Assistance with financial audits, compliance reviews, internal controls, and financial reporting."
    },
    {
      name: "AML Compliance",
      icon: <ShieldCheck className="h-8 w-8" />,
      description: "Support for anti-money laundering compliance, KYC procedures, risk assessment, and reporting."
    },
    {
      name: "Real Estate Advisory",
      icon: <Building2Icon className="h-8 w-8" />,
      description: "Insights on property investment, market trends, valuations, and management in the UAE."
    }
  ];

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
      
      <div className="max-w-4xl mx-auto my-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl">Multi-Domain AI Consultants Access</CardTitle>
            <CardDescription>
              Get expert advice across IT, Taxation, Auditing, AML Compliance, and Real Estate domains - all powered by advanced AI and Waraha Group's expertise.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Our AI Consultants can help you with:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {consultancyDomains.map((domain, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center mb-2">
                        <div className="p-3 rounded-full bg-primary/10 mb-3">
                          {domain.icon}
                        </div>
                        <h4 className="font-medium text-lg">{domain.name}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground text-center">
                        {domain.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
                  {isSubmitting ? "Processing..." : "Access Multi-Domain AI Consultants"}
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
