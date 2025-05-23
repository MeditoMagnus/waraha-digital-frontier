
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Server, Cloud, ShieldCheck, Monitor, Users, MessageSquare } from 'lucide-react';
import SEOMetaTags from '../components/SEOMetaTags';

const ITConsultancy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full">
      <SEOMetaTags 
        title="IT Consultancy Services in UAE | Waraha Group"
        description="Expert IT consultancy services across UAE. Cloud solutions, cybersecurity, digital transformation, and managed services tailored for your business needs."
        keywords={[
          'IT consultancy UAE',
          'IT solutions Dubai',
          'digital transformation UAE',
          'cloud services Dubai',
          'cybersecurity consultancy UAE',
          'managed IT services',
          'IT infrastructure UAE',
          'business IT solutions Dubai',
          'technology consulting UAE',
          'enterprise IT services'
        ]}
      />
      <ParticleBackground />
      <Navbar />

      <div className="pt-24 pb-16 bg-gradient-to-b from-waraha-midnight to-[#192236]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4">IT Consultancy Services</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transform your business with our comprehensive IT solutions tailored for the UAE market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <Card className="bg-waraha-midnight/70 border-waraha-silver/20">
              <CardHeader>
                <div className="h-12 w-12 bg-waraha-gold/20 rounded-full flex items-center justify-center mb-4">
                  <Server className="h-6 w-6 text-waraha-gold" />
                </div>
                <CardTitle>IT Infrastructure</CardTitle>
                <CardDescription>Optimize your technology foundation</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {['Network architecture design', 'Server optimization', 'Storage solutions', 'Hardware consulting'].map((item) => (
                    <li key={item} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-waraha-gold mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-waraha-midnight/70 border-waraha-silver/20">
              <CardHeader>
                <div className="h-12 w-12 bg-waraha-gold/20 rounded-full flex items-center justify-center mb-4">
                  <Cloud className="h-6 w-6 text-waraha-gold" />
                </div>
                <CardTitle>Cloud Solutions</CardTitle>
                <CardDescription>Scalable and secure cloud services</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {['Cloud migration strategy', 'AWS & Azure consulting', 'SaaS implementation', 'Cloud cost optimization'].map((item) => (
                    <li key={item} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-waraha-gold mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-waraha-midnight/70 border-waraha-silver/20">
              <CardHeader>
                <div className="h-12 w-12 bg-waraha-gold/20 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-waraha-gold" />
                </div>
                <CardTitle>Cybersecurity</CardTitle>
                <CardDescription>Protect your digital assets</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {['Security assessments', 'Threat detection & prevention', 'Compliance consulting', 'Security awareness training'].map((item) => (
                    <li key={item} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-waraha-gold mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-waraha-midnight/70 border-waraha-silver/20">
              <CardHeader>
                <div className="h-12 w-12 bg-waraha-gold/20 rounded-full flex items-center justify-center mb-4">
                  <Monitor className="h-6 w-6 text-waraha-gold" />
                </div>
                <CardTitle>Digital Transformation</CardTitle>
                <CardDescription>Modernize your business operations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {['Business process automation', 'Legacy system modernization', 'Digital strategy consulting', 'Technology roadmapping'].map((item) => (
                    <li key={item} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-waraha-gold mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-waraha-midnight/70 border-waraha-silver/20">
              <CardHeader>
                <div className="h-12 w-12 bg-waraha-gold/20 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-waraha-gold" />
                </div>
                <CardTitle>Managed IT Services</CardTitle>
                <CardDescription>Proactive IT management</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {['24/7 system monitoring', 'IT helpdesk support', 'Proactive maintenance', 'Technology consulting'].map((item) => (
                    <li key={item} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-waraha-gold mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-waraha-midnight/70 border-waraha-silver/20">
              <CardHeader>
                <div className="h-12 w-12 bg-waraha-gold/20 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-waraha-gold" />
                </div>
                <CardTitle>IT Consultation</CardTitle>
                <CardDescription>Strategic technology guidance</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {['IT strategy development', 'Technology assessment', 'Vendor selection', 'IT governance consulting'].map((item) => (
                    <li key={item} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-waraha-gold mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <h2 className="text-3xl font-serif mb-6">Ready to transform your IT infrastructure?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Our UAE-based IT consultants are ready to help your business leverage technology for growth.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-waraha-gold hover:bg-waraha-gold/90 text-waraha-midnight font-semibold"
              >
                <a href="#contact">Request Consultation</a>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-waraha-gold text-waraha-gold hover:bg-waraha-gold/10"
              >
                <a href="/services/all-services">Explore All Services</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ITConsultancy;
