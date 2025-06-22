const Card = ({ 
  children, 
  variant = "default", 
  padding = "default",
  className = "",
  ...props 
}) => {
  const baseStyles = "rounded-3xl shadow-lg border transition-all duration-200 hover:shadow-xl";
  
  const variants = {
    default: "bg-white/60 backdrop-blur-sm border-[#E9D8C5]",
    glass: "bg-white/40 backdrop-blur-sm border-[#E9D8C5]",
    solid: "bg-white border-[#E9D8C5]",
    feature: "bg-white/60 backdrop-blur-sm border-[#E9D8C5] hover:scale-105",
    faq: "bg-white/60 backdrop-blur-sm border-[#E9D8C5]"
  };
  
  const paddings = {
    none: "",
    sm: "p-4",
    default: "p-6",
    lg: "p-8",
    xl: "p-10"
  };
  
  const cardStyles = `${baseStyles} ${variants[variant]} ${paddings[padding]} ${className}`;
  
  return (
    <div className={cardStyles} {...props}>
      {children}
    </div>
  );
};

export default Card; 