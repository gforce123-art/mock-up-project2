import React, { useRef } from 'react';

interface ImagePreviewProps {
  imageUrl: string;
  isGenerating: boolean;
  generationError: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGenerateImage: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUrl,
  isGenerating,
  generationError,
  onFileChange,
  onGenerateImage,
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input type="file" accept="image/*" ref={fileInputRef} onChange={onFileChange} className="hidden" />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
        >
          <i className="fas fa-upload mr-2"></i> Upload Image
        </button>
        <button
          type="button"
          onClick={onGenerateImage}
          disabled={isGenerating}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center disabled:bg-purple-800 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <i className="fas fa-magic mr-2"></i> Generate with AI
            </>
          )}
        </button>
      </div>
      {generationError && <p className="text-red-400 text-sm text-center">{generationError}</p>}
    </div>
  );
};

export default ImagePreview;
