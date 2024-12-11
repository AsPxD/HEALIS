import React from 'react';
import { Menu, X, Activity, UserCircle2, Youtube } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../shared/Button';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-50 bg-white/80 backdrop-blur-lg shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link to="/" className="flex items-center">
            <Activity className="h-8 w-8 text-[#4CAFEB]" />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-[#4CAFEB] to-cyan-500 
              text-transparent bg-clip-text">Healis</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" active={location.pathname === "/"}>Home</NavLink>
            <NavLink to="/news" active={location.pathname === "/news"}>News</NavLink>
            <NavLink to="/about" active={location.pathname === "/about"}>About Us</NavLink>
            <NavLink to="/contact" active={location.pathname === "/contact"}>Contact</NavLink>
            <Link 
              to="/features"
              className="text-gray-700 hover:text-[#4CAFEB] transition-colors duration-300"
            >
              <Youtube className="w-6 h-6" />
            </Link>
            <Button
              variant="outline"
              onClick={() => navigate('/auth')}
              className="px-4 py-2"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate('/auth')}
              className="px-4 py-2"
            >
              Sign Up
            </Button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <UserCircle2 className="w-6 h-6 text-gray-600" />
            </motion.button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="md:hidden overflow-hidden bg-white"
      >
        <div className="px-4 pt-2 pb-3 space-y-1">
          <MobileNavLink to="/" active={location.pathname === "/"}>Home</MobileNavLink>
          <MobileNavLink to="/news" active={location.pathname === "/news"}>News</MobileNavLink>
          <MobileNavLink to="/about" active={location.pathname === "/about"}>About Us</MobileNavLink>
          <MobileNavLink to="/contact" active={location.pathname === "/contact"}>Contact</MobileNavLink>
          <MobileNavLink to="/features" active={location.pathname === "/features"}>
            <div className="flex items-center gap-2">
              <Youtube className="w-5 h-5" />
              <span>Feature Videos</span>
            </div>
          </MobileNavLink>
          <MobileNavLink to="/dashboard" active={location.pathname === "/dashboard"}>Dashboard</MobileNavLink>
          <div className="pt-4 flex flex-col space-y-2">
            <Button
              variant="outline"
              onClick={() => {
                navigate('/auth');
                setIsOpen(false);
              }}
              className="w-full"
            >
              Login
            </Button>
            <Button
              onClick={() => {
                navigate('/auth');
                setIsOpen(false);
              }}
              className="w-full"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

const NavLink = ({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) => (
  <Link
    to={to}
    className={`relative text-gray-700 hover:text-[#4CAFEB] transition-colors duration-300
      ${active ? 'text-[#4CAFEB]' : ''}`}
  >
    {children}
    {active && (
      <motion.div
        layoutId="underline"
        className="absolute left-0 right-0 h-0.5 bg-[#4CAFEB] bottom-0"
      />
    )}
  </Link>
);

const MobileNavLink = ({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) => (
  <Link
    to={to}
    className={`block px-3 py-2 rounded-xl transition-colors duration-300
      ${active 
        ? 'bg-[#4CAFEB]/10 text-[#4CAFEB]' 
        : 'text-gray-700 hover:bg-gray-50 hover:text-[#4CAFEB]'
      }`}
  >
    {children}
  </Link>
);

export default Navbar;