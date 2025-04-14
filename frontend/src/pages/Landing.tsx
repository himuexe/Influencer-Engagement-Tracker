
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, Layers, Users, CheckCircle } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Landing = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header / Hero Section */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <header className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-primary font-heading text-xl font-bold dark:text-white">SocialPulse</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary">Features</a>
              <a href="#testimonials" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary">Testimonials</a>
            </div>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              {user ? (
                <Link to="/dashboard">
                  <Button>Dashboard</Button>
                </Link>
              ) : (
                <div className="flex space-x-3">
                  <Link to="/login">
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button>Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </header>

        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight text-gray-800 dark:text-white">
                Measure, Analyze, <br />
                <span className="text-primary">Scale</span> Your <br />
                Influencer Marketing
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Track engagement, measure ROI, and optimize your influencer campaigns across Instagram, Twitter, and YouTube.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="gap-2">
                    Start For Free <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 transform rotate-2 z-20 animate-fade-in">
                <img
                  src="https://placehold.co/800x500/4F46E5/FFFFFF/png?text=Dashboard+Analytics&font=montserrat"
                  alt="Platform Dashboard"
                  className="rounded-lg"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 transform -rotate-3 z-10 w-2/3">
                <img
                  src="https://placehold.co/600x300/F43F5E/FFFFFF/png?text=Campaign+Metrics&font=montserrat"
                  alt="Campaign Metrics"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 dark:text-white">Powerful Features</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to run successful influencer marketing campaigns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <BarChart2 className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3 dark:text-white">Real-time Analytics</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track engagement, impressions, and conversions in real-time with intuitive dashboards.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Layers className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3 dark:text-white">Campaign Management</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create, track, and optimize campaigns across multiple social platforms.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Users className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3 dark:text-white">Influencer Database</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your relationships with influencers and track their performance.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link to="/signup">
              <Button size="lg">
                Start For Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 dark:text-white">Trusted by Marketing Teams</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              See what our customers have to say about SocialPulse
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden mr-4">
                  <img src="https://i.pravatar.cc/100?img=1" alt="Customer" className="h-full w-full object-cover" />
                </div>
                <div>
                  <h4 className="font-medium dark:text-white">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Marketing Director, Brandhub</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "SocialPulse has completely transformed how we track our influencer marketing ROI. The analytics are detailed yet easy to understand."
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden mr-4">
                  <img src="https://i.pravatar.cc/100?img=11" alt="Customer" className="h-full w-full object-cover" />
                </div>
                <div>
                  <h4 className="font-medium dark:text-white">Mark Thompson</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">CMO, TechGrowth</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "The campaign reporting features save us hours of work every week. We've increased our influencer marketing ROI significantly since using SocialPulse."
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden mr-4">
                  <img src="https://i.pravatar.cc/100?img=5" alt="Customer" className="h-full w-full object-cover" />
                </div>
                <div>
                  <h4 className="font-medium dark:text-white">Jessica Lee</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Social Media Manager, FashionFirst</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "Being able to track performance across Instagram, Twitter, and YouTube in one place has been a game-changer for our team."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-xl font-bold mb-4">SocialPulse</div>
              <p className="text-gray-400">
                Measure, analyze, and scale your influencer marketing campaigns.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Product</h5>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#testimonials" className="text-gray-400 hover:text-white">Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Resources</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} SocialPulse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
