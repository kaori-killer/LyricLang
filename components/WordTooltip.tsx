import { useState } from "react";

interface WordTooltipProps {
  word: string;
  children: React.ReactNode;
  onWordClick?: (word: string) => void;
}

export function WordTooltip({ word, children, onWordClick }: WordTooltipProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (onWordClick) {
      onWordClick(word);
    }
  };

  return (
    <span 
      className={`cursor-pointer rounded px-1 transition-colors ${
        isHovered 
          ? 'bg-yellow-200 bg-opacity-70' 
          : 'hover:bg-yellow-200 hover:bg-opacity-50'
      }`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={`클릭하여 "${word}" 뜻 보기`}
    >
      {children}
    </span>
  );
}