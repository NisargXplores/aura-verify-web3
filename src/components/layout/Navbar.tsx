
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, Menu, X, Home, FileCheck, LayoutDashboard } from "lucide-react";
import WalletConnectionUI from "@/components/wallet/WalletConnectionUI";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { name: "Home", path: "/", icon: <Home className="h-4 w-4 mr-1" /> },
    { name: "Verify", path: "/verify", icon: <FileCheck className="h-4 w-4 mr-1" /> },
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="h-4 w-4 mr-1" /> },
    { name: "About Us", path: "/about", icon: <FileCheck className="h-4 w-4 mr-1" /> },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="backdrop-blur-lg bg-black/20 border-b border-white/5 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-web3-purple via-web3-blue to-web3-teal flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-web3-purple via-web3-blue to-web3-teal opacity-30 blur-sm animate-pulse-glow"></div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold gradient-text-primary tracking-tight font-heading">BlockVerify</h1>
                <p className="text-xs text-gray-400">Blockchain Identity Verification</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.path) 
                      ? "bg-white/10 text-white" 
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="pl-4 border-l border-white/10">
              <WalletConnectionUI minimal />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <WalletConnectionUI minimal />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 ml-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? "bg-web3-purple/20 text-white"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
