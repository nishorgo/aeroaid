import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { getImageUrl } from '@/lib/utils/supa-utils';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange?: (file: File) => void;
  width?: string;
  height?: string;
  className?: string;
}

const ImageUpload = ({
  currentImage,
  onImageChange,
  width = 'w-40',
  height = 'h-40',
  className = '',
}: ImageUploadProps) => {
  const [imageUrl, setImageUrl] = useState<string>('/avatar-placeholder.jpg');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentImage) {
      const publicUrl = getImageUrl('avatars', currentImage);
      if (publicUrl) {
        setImageUrl(publicUrl);
      }
    }
  }, [currentImage]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      onImageChange?.(file);
    }
  };

  return (
    <div 
      className={`${width} ${height} bg-slate-200 rounded-lg overflow-hidden cursor-pointer relative group ${className}`}
      onClick={handleImageClick}
    >
      <Image
        src={imageUrl}
        alt="Upload Image"
        width={160}
        height={160}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-white text-xs tracking-widest font-semibold">CHANGE PHOTO</span>
      </div>
      <input 
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
