import Link from "next/link";
import Avatar from "../ui/Avatar";

const Header = ({ 
  user = null,
  navigation = [],
  className = "",
  ...props 
}) => {
  const defaultNavigation = [
    { href: "/", label: "Home" },
    { href: "#features", label: "Features" },
    { href: "#faq", label: "FAQ" }
  ];
  
  const nav = navigation.length > 0 ? navigation : defaultNavigation;
  
  return (
    <header className={`z-10 bg-gradient-to-r from-[#FFF4E6] to-[#E9D8C5] ${className}`} {...props}>
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
        
          {/* Logo */}
          <Link href="/" className="text-black font-bold text-xl">
            <img src="./public/icons/QuestFlat-01.png" alt="QuestFlat Logo" className="px-8 py-3 rounded-2xl shadow-lg" />
          </Link> 
          
          {/* Left Navigation */}
          <nav className="flex space-x-8">
            {nav.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className="text-[#3C6E57] hover:text-[#2E5744] font-medium transition-colors duration-200 px-3 py-2 rounded-full hover:bg-[#74A27E]/10"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right User Section */}
          <div className="flex items-center space-x-4">
            <span className="text-[#3C6E57] font-medium">
              {user ? user.name : "Guest"}
            </span>
            <Avatar 
              src={user?.avatar}
              fallback={user ? user.name.charAt(0) : "👤"}
              size="md"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 