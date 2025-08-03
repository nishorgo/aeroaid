export const Count = ({ number }: { number: number }) => {
    return (
      <div className="flex gap-1">
        {String(number).padStart(2, "0").split("").map((digit, index) => (
          <div
            key={index}
            className="flex items-center justify-center w-14 h-20 bg-black/80 text-white rounded-md text-6xl font-digital"
          >
            {digit}
          </div>
        ))}
      </div>
    );
  };