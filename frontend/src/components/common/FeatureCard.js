import Card from "../ui/Card";

const FeatureCard = ({ 
  icon,
  title,
  description,
  gradient = "default",
  className = "",
  ...props 
}) => {
  const gradients = {
    default: "bg-gradient-to-br from-[#FFD972] to-[#9A7FF5]",
    green: "bg-gradient-to-br from-[#74A27E] to-[#D4A6A6]",
    purple: "bg-gradient-to-br from-[#9A7FF5] to-[#FFD972]",
    warm: "bg-gradient-to-br from-[#FFD972] to-[#D4A6A6]"
  };
  
  return (
    <Card variant="feature" padding="lg" className={`text-center ${className}`} {...props}>
      <div className={`w-24 h-24 ${gradients[gradient]} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
        <span className="text-4xl">{icon}</span>
      </div>
      <h4 className="text-2xl font-bold mb-4 text-[#3C6E57]">{title}</h4>
      <p className="text-[#2E5744]/80 leading-relaxed">{description}</p>
    </Card>
  );
};

export default FeatureCard; 