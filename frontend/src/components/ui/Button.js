import Link from "next/link";

const Button = ({ 
  children, 
  variant = "primary", 
  size = "md", 
  href,
  onClick,
  disabled = false,
  className = "",
  ...props 
}) => {
  const baseStyles = "font-bold rounded-full transition-all duration-200 shadow-lg border-4 inline-flex items-center justify-center";
  
  const variants = {
    primary: "bg-gradient-to-br from-[#9A7FF5] to-[#74A27E] text-white border-white/50 hover:shadow-xl hover:scale-105",
    secondary: "bg-white/80 backdrop-blur-sm text-[#3C6E57] border-[#9A7FF5]/30 hover:bg-white hover:shadow-xl hover:scale-105",
    ghost: "bg-transparent text-[#3C6E57] border-transparent hover:bg-[#74A27E]/10 hover:border-[#74A27E]/20",
    outline: "bg-transparent text-[#3C6E57] border-[#3C6E57] hover:bg-[#3C6E57] hover:text-white"
  };
  
  const sizes = {
    sm: "px-6 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-xl",
    xl: "px-12 py-5 text-2xl"
  };
  
  const buttonStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
  
  if (href) {
    return (
      <Link href={href} className={buttonStyles} {...props}>
        {children}
      </Link>
    );
  }
  
  return (
    <button 
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 