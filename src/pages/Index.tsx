
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Shield, Zap, Users, Database } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Database className="w-6 h-6" />,
      title: "Secure Registry",
      description: "Centralized OS image management with enterprise-grade security"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "License Tracking",
      description: "Automated license monitoring and renewal notifications"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Client Management",
      description: "Comprehensive institution and user management system"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-time Analytics",
      description: "Live dashboards with usage metrics and performance insights"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-cyan-50/30 dark:from-slate-900 dark:via-purple-900/10 dark:to-cyan-900/10">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl shadow-2xl bg-gradient-to-tr from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center group hover-lift">
                  <span className="text-6xl font-black text-white select-none drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                    ER
                  </span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              </div>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-slate-900 via-purple-700 to-cyan-700 dark:from-slate-100 dark:via-purple-300 dark:to-cyan-300 bg-clip-text text-transparent leading-tight">
              Edvirons Registry
            </h1>
            
            <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-4xl mx-auto">
              The future of institutional OS image management. Secure, scalable, and intelligent platform 
              designed for modern educational institutions and enterprises.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button
                size="lg"
                className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-xl hover-lift group"
                onClick={() => navigate("/dashboard")}
              >
                Launch Dashboard
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg font-semibold border-2 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                View Documentation
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 animate-slide-up">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover-lift"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-slate-100">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Hero Image */}
          <div className="relative animate-scale-in">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-3xl blur-3xl"></div>
            <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
                alt="Modern workspace with laptop displaying code"
                className="w-full h-auto object-cover"
                style={{ aspectRatio: "16/9" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-t border-slate-200/50 dark:border-slate-700/50 bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "500+", label: "Active Institutions" },
              { number: "10K+", label: "OS Images Managed" },
              { number: "99.9%", label: "Uptime Guarantee" },
              { number: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-slate-100 mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600 dark:text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
