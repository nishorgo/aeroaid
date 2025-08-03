interface HighlightedTextProps {
  text: string;
  bgColor?: string;
  fontColor?: string;
  textAlign?: string; 
  className?: string;
}

const HighlightedText = ({ text, bgColor = 'bg-red-500', fontColor = 'text-white', textAlign = 'center', className = '' }: HighlightedTextProps) => {
  return (
    <div className={`text-${textAlign} ${className}`}>
      <span className={`${bgColor} ${fontColor} tracking-widest font-semibold py-2 px-4 rounded-lg inline-block`}>
        {text}
      </span>
    </div>
  );
};

export default HighlightedText;
