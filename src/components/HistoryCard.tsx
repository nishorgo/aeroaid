interface HistoryCardProps {
  patient_name?: string;
  hospital?: string;
  location?: string;
  reference?: string;
  date?: string;
  showButton?: boolean;
  onAddToList?: () => void;
  id?: string;
  donor_id?: string;
  status?: string;
}

const HistoryCard = ({
  patient_name = 'N/A',
  hospital = 'N/A',
  location = 'N/A',
  reference = 'N/A',
  date = 'N/A',
  showButton = false,
  onAddToList,
}: HistoryCardProps) => {
  return (
    <div className="overflow-hidden rounded-lg">
      <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-100">
        <div className="p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-semibold">PATIENT NAME:</span>
            <span className="text-gray-600">{patient_name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-semibold">HOSPITAL:</span>
            <span className="text-gray-600">{hospital}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-semibold">LOCATION:</span>
            <span className="text-white font-semibold bg-red-500 px-2 rounded-lg">{location}</span>
          </div>
        </div>
        <div className="bg-neutral-300 p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-semibold">REFERENCE:</span>
            <span className="text-gray-600">{reference}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-semibold">DATE:</span>
            <span className="text-white font-semibold bg-green-500 px-2 rounded-lg">{date}</span>
          </div>
        </div>
        {showButton && (
          <div className="bg-neutral-300">
            <button
              onClick={onAddToList}
              className="w-full bg-yellow-400 text-gray-600 py-2 px-4 rounded-b-lg font-semibold tracking-widest hover:bg-yellow-500 transition-colors"
            >
              ACCEPT INVITATION
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryCard;
