interface MechanicalDateProps {
  date: Date | string;
}

const MechanicalDate = ({ date }: MechanicalDateProps) => {
  const formatDate = (inputDate: Date | string) => {
    const d = new Date(inputDate);
    const day = d.getDate().toString().padStart(2, '0');
    const month = d.toLocaleString('en-US', { month: 'short' });
    const year = d.getFullYear();
    return { day, month, year };
  };

  const { day, month, year } = formatDate(date);

  return (
    <div className="flex justify-center w-full">
      <div className="flex items-center gap-4">
        {/* Day */}
        <div className="flex gap-1">
          {day.split('').map((digit, index) => (
            <div
              key={`day-${index}`}
              className="flex items-center justify-center w-8 h-12 bg-black/80 text-white rounded-md text-3xl font-digital"
            >
              {digit}
            </div>
          ))}
        </div>

        {/* Month */}
        <div className="flex gap-1">
          {month.split('').map((letter, index) => (
            <div
              key={`month-${index}`}
              className="flex items-center justify-center w-8 h-12 bg-green-500 text-white rounded-md text-3xl font-digital"
            >
              {letter}
            </div>
          ))}
        </div>

        {/* Year */}
        <div className="flex gap-1">
          {year.toString().split('').map((digit, index) => (
            <div
              key={`year-${index}`}
              className="flex items-center justify-center w-8 h-12 bg-black/80 text-white rounded-md text-3xl font-digital"
            >
              {digit}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MechanicalDate;
