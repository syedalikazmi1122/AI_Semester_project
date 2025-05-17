
import { useState, useEffect, useRef } from 'react';
import { 
  BarChart, Map, MapPin, ArrowRight, 
  LineChart, Layers, Trees, Zap, ChevronRight
} from 'lucide-react';

function ModelCard({ icon, title,link, description, features, animation }) {
    console.log ("link",link)
  return (
    <div className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl ${animation} group`}>
      <div className="p-4 rounded-xl bg-gray-700/30 inline-block mb-6">
        {icon}
      </div>
      
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5">
              <svg className="h-3 w-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="ml-3 text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="mt-8  cursor-pointer">
        <a href={link} className="w-full py-3 rounded-xl border border-emerald-500/50 text-emerald-400 font-medium hover:bg-emerald-500 hover:text-white transition-all duration-300 flex items-center justify-center group-hover:border-emerald-500">
          Select {title} <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

// Main App Component
export default function LandPredictionLanding() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const heroRef = useRef(null);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle hero section animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-12');
          // Trigger additional animations after hero is visible
          setTimeout(() => setAnimationComplete(true), 800);
        }
      },
      { threshold: 0.1 }
    );
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-900/30 via-gray-900 to-green-900/30"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full filter blur-3xl animate-pulse" style={{animationDuration: '15s'}}></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/20 rounded-full filter blur-3xl animate-pulse" style={{animationDuration: '20s'}}></div>
      </div>
      
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/80 backdrop-blur-lg py-3 shadow-lg shadow-emerald-500/20' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Map className="h-8 w-8 text-emerald-500" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-400">TerrValue</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#models" className="text-gray-300 hover:text-emerald-400 transition-colors">Models</a>
            <a href="#about" className="text-gray-300 hover:text-emerald-400 transition-colors">About</a>
            <a href="#contact" className="text-gray-300 hover:text-emerald-400 transition-colors">Contact</a>
          </div>
          
          <button className="hidden md:block bg-gradient-to-r from-emerald-500 to-green-400 text-white py-2 px-6 rounded-full font-medium hover:shadow-lg hover:shadow-emerald-500/50 transition-all hover:-translate-y-1">
            Get Started
          </button>
          
          <button className="md:hidden text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 min-h-screen flex items-center z-10">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/30 to-transparent z-0"></div>
        
        <div className="container mx-auto px-4 z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div ref={heroRef} className="transition-all duration-1000 transform opacity-0 translate-y-12">
              <div className="inline-block mb-4 px-4 py-1 rounded-full bg-emerald-900/30 border border-emerald-500/30 backdrop-blur-sm">
                <span className="text-emerald-400 text-sm font-medium">Next-Gen AI Prediction Platform</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                Predict Land <span className="relative">
                  <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-400">Values</span>
                  <span className="absolute -bottom-2 left-0 w-full h-3 bg-gradient-to-r from-emerald-500/30 to-green-500/30 rounded-full blur-sm"></span>
                </span> With Precision
              </h1>
              
              <p className="mt-6 text-lg text-gray-300 max-w-lg">
                Our cutting-edge AI models deliver industry-leading accuracy for land valuation. Make data-driven real estate investments with confidence.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <a href='#models' className="bg-gradient-to-r from-emerald-500 to-green-400 text-white py-4 px-8 rounded-full font-medium hover:shadow-xl hover:shadow-emerald-500/40 transition-all hover:-translate-y-1 flex items-center">
                  Start Predicting <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <button className="bg-gray-800/80 backdrop-blur-sm border border-emerald-500/30 text-emerald-400 py-4 px-8 rounded-full font-medium hover:bg-emerald-500/10 transition-all">
                  Learn More
                </button>
              </div>
              
              <div className="mt-12 grid grid-cols-3 gap-6">
                <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/30">
                  <div className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">98%</div>
                  <div className="text-sm text-gray-400 text-center mt-1">Prediction Accuracy</div>
                </div>
                <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/30">
                  <div className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">50K+</div>
                  <div className="text-sm text-gray-400 text-center mt-1">Land Plots Analyzed</div>
                </div>
                <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/30">
                  <div className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">24/7</div>
                  <div className="text-sm text-gray-400 text-center mt-1">Real-time Updates</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-500/20 rounded-full filter blur-3xl animate-pulse" style={{animationDuration: '15s'}}></div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-green-500/20 rounded-full filter blur-3xl animate-pulse" style={{animationDuration: '20s'}}></div>
              
              <div className="w-full h-full flex items-center justify-center">
                <div className={`relative w-full aspect-square max-w-md mx-auto transition-all duration-1000 ${animationComplete ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/30 to-green-500/30 animate-pulse" style={{animationDuration: '3s'}}></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5/6 h-5/6 rounded-3xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl p-6 shadow-2xl shadow-emerald-500/30 border border-gray-700/50 overflow-hidden">
                      {/* Animated 3D effect */}
                      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-emerald-500/10 to-transparent transform -skew-y-6"></div>
                      
                      <div className="h-full w-full rounded-2xl overflow-hidden relative">
                        <img src="https://img.freepik.com/premium-photo/colorful-world-map-with-vintage-aesthetic-showing-all-continents-countries_14117-1093982.jpg?w=360" alt="Land value heatmap" className="object-cover h-full w-full" />
                        
                        {/* Animated overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-emerald-900/70"></div>
                        
                        {/* Animated scan line */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-emerald-400/30 animate-scan"></div>
                        
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="text-base font-medium text-emerald-400">Value Prediction Heatmap</div>
                          <div className="text-xs text-gray-400 flex items-center">
                            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                            Live Analysis: Riverside County, CA
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section id="models" className="py-20 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-900/95 z-0"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-emerald-600/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-green-500/10 rounded-full filter blur-2xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-4 px-4 py-1 rounded-full bg-emerald-900/50 border border-emerald-500/30 backdrop-blur-sm">
              <span className="text-emerald-400 text-sm font-medium">Powerful AI Models</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold">
              Choose Your <span className="relative">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-400">Prediction</span>
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-gradient-to-r from-emerald-500/30 to-green-500/30 rounded-full blur-sm"></span>
              </span> Engine
            </h2>
            
            <p className="mt-6 text-lg text-gray-300">
              Select from three cutting-edge AI models, each optimized for different land valuation scenarios
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Linear Regression Model */}
            <div className={`relative group transition-all duration-500 ${animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{transitionDelay: '200ms'}}>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-emerald-500/20 rounded-2xl blur-xl group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
                <ModelCard 
                    icon={<LineChart className="h-12 w-12 text-emerald-400" />}
                    title="Linear Regressor"
                    link ="/linear"
                    description="Perfect for straightforward land valuation with strong linear features. Highly interpretable results with feature importance analysis."
                    features={[
                    "Fast computation times",
                    "Excellent for baseline predictions",
                    "Transparent decision factors"
                    ]}
                    animation="hover:shadow-emerald-500/30"
                    glowColor="from-emerald-600/80 to-emerald-400/80"
                />
            </div>
            
            {/* Random Forest Model */}
            <div className={`relative group transition-all duration-500 ${animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{transitionDelay: '400ms'}}>
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-green-500/20 rounded-2xl blur-xl group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
              <ModelCard
               icon={<Trees className="h-12 w-12 text-green-400" />}
               title="Forest Regressor"
               link="/forest"
                description="Ensemble-based approach that captures complex relationships between land features and prices across diverse regions."
                features={[
                  "Handles non-linear relationships",
                  "Robust to outliers and noise",
                  "Excellent for varied terrain"
                ]}
                animation="hover:shadow-green-500/30"
                glowColor="from-green-600/80 to-green-400/80"
              />
            </div>
            
            {/* LightGBM Model */}
            <div className={`relative group transition-all duration-500 ${animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{transitionDelay: '600ms'}}>
              <div className="absolute inset-0 bg-gradient-to-r from-lime-600/20 to-lime-500/20 rounded-2xl blur-xl group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
              <ModelCard 
                icon={<Zap className="h-12 w-12 text-lime-400" />}
                title="LightGBM"
                description="Gradient boosting framework designed for distributed and efficient training. Ideal for large datasets and high-dimensional features."
                features={[
                  "Fast training and prediction",
                  "Handles large datasets efficiently",
                  "Supports categorical features natively"
                ]}
                link="/light-gbm"
                animation="hover:shadow-lime-500/30"
                glowColor="from-lime-600/80 to-lime-400/80"
              />
            </div>
          </div>
          </div>
      </section>
    
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-900/40 to-green-900/40">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make <span className="text-emerald-400">Smarter</span> Land Investments?
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300 mb-10">
            Join thousands of real estate professionals, investors, and developers who trust our AI-powered land valuation system.
          </p>
          
          <button className="bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 px-10 rounded-full font-medium text-lg hover:shadow-lg hover:shadow-emerald-500/30 transition-all hover:-translate-y-1 flex items-center mx-auto">
            Start Your Free Trial <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 pt-16 pb-8 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Map className="h-6 w-6 text-emerald-500" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-500">TerrValue</span>
              </div>
              <p className="text-gray-400 text-sm">
                Advanced land valuation and prediction system powered by machine learning algorithms.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 text-sm">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 text-sm">Models</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 text-sm">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 text-sm">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 text-sm">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 text-sm">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 text-sm">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 text-sm">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 text-sm">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 text-sm">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 text-sm">Status</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 text-sm">Community</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} TerrValue. All rights reserved.
          </div>
        </div>
      </footer>
      </div>
    
  );
}

// Model Card Component

// Feature Card Component
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:bg-gray-700/30 transition-all">
      <div className="p-3 rounded-lg bg-emerald-500/20 inline-block mb-4 text-emerald-400">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}