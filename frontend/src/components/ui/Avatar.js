const Avatar = ({ 
  src,
  alt = "Avatar",
  size = "md",
  fallback = "👤",
  gradient = "default",
  className = "",
  ...props 
}) => {
  const sizes = {
    sm: "w-8 h-8 text-base",
    md: "w-10 h-10 text-lg",
    lg: "w-16 h-16 text-2xl",
    xl: "w-24 h-24 text-4xl"
  };
  
  const gradients = {
    default: "bg-gradient-to-br from-[#FFD972] to-[#D4A6A6]",
    purple: "bg-gradient-to-br from-[#9A7FF5] to-[#74A27E]",
    green: "bg-gradient-to-br from-[#74A27E] to-[#3C6E57]",
    warm: "bg-gradient-to-br from-[#FFD972] to-[#9A7FF5]"
  };
  
  const baseStyles = "rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:shadow-lg";
  const avatarStyles = `${baseStyles} ${sizes[size]} ${gradients[gradient]} ${className}`;
  
  if (src) {
    return (
      <img 
        src={src} 
        alt={alt}
        className={`${avatarStyles} object-cover`}
        {...props}
      />
    );
  }
  
  return (
    <div className={avatarStyles} {...props}>
      <span>{fallback}</span>
    </div>
  );
};

export default Avatar; 