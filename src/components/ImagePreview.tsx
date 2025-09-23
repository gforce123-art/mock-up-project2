
import React, { useRef } from 'react';

interface ImagePreviewProps {
  imageUrl: string;
  error: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUrl,
  error,
  onFileChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col space-y-4">
      <div className="w-full aspect-[16/9] bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt="Car preview" className="w-full h-full object-contain" />
        ) : (
          <div className="text-gray-400 flex flex-col items-center">
            <i className="fas fa-image fa-3x mb-2"></i>
            <span className="text-sm">Image Preview</span>
          </div>
        )}
      </div>
      <div>
        <input type="file" accept="image/*" ref={fileInputRef} onChange={onFileChange} className="hidden" />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
        >
          <i className="fas fa-upload mr-2"></i> ເພີ່ມຮູບລົດ
        </button>
      </div>
      {error && <p className="text-red-400 text-sm text-center">{error}</p>}
    </div>
  );
};

export default ImagePreview;
