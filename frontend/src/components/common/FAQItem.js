import { useState } from "react";
import Card from "../ui/Card";

const FAQItem = ({ 
  question,
  answer,
  defaultOpen = false,
  className = "",
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <Card variant="faq" padding="lg" className={className} {...props}>
      <button 
        className="w-full text-left flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="text-xl font-bold text-[#3C6E57] pr-4">
          {question}
        </h4>
        <span className="text-[#3C6E57] text-2xl transition-transform duration-200 flex-shrink-0">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-[#E9D8C5]">
          <p className="text-[#2E5744]/80 leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </Card>
  );
};

export default FAQItem; 