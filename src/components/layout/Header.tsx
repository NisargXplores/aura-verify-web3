
import React from "react";
import { useWallet } from "@/context/WalletContext";

const Header = () => {
  const { connected } = useWallet();
  
  return (
    <header className="w-full py-4 px-4 md:px-6 z-10 mt-16">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Empty header - Navbar is used instead */}
      </div>
    </header>
  );
};

export default Header;
