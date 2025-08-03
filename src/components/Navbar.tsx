import MenuDropdown from './MenuDropdown';
import SelectField from './SelectField';
import { useState } from 'react';
import { bloodGroups } from '@/data/dropdown';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// Define props type
type NavbarProps = {
  searchValue?: string;
  onSearchChange?: (query: string) => void;
};

const Navbar = ({ searchValue, onSearchChange }: NavbarProps) => {  
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedBloodGroup, setSelectedBloodGroup] = useState(searchValue || searchParams.get('bloodGroup') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedBloodGroup) {
      params.set('bloodGroup', selectedBloodGroup);
    }
    router.push(`/search?${params.toString()}`);
    
    // Call onSearchChange if provided
    onSearchChange?.(selectedBloodGroup);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="p-2 flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Aeroaid Logo" width={100} height={100} className="w-14 h-14" />
          </Link>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-xl mx-4">
          <form onSubmit={handleSearch} className="flex gap-2 items-center">
            <div className="flex-1 relative">
              <SelectField
                label=""
                value={selectedBloodGroup}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setSelectedBloodGroup(newValue);
                  // Optional: call onSearchChange if provided
                  onSearchChange?.(newValue);
                }}
                options={bloodGroups}
                placeholder="Blood Group"
                className="rounded-3xl h-10"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-500 text-white h-8 px-4 rounded-3xl text-sm hover:bg-green-600 transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Menu */}
        <div className="flex-shrink-0">
          <MenuDropdown />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
