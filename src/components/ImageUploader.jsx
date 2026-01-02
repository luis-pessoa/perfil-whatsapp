import React from 'react';

const ImageUploader = ({ onUpload }) => {
    const handleFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            onUpload(file);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer relative">
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-blue-600 font-semibold">Clique para carregar uma foto</p>
            <p className="text-blue-400 text-sm mt-1">ou arraste e solte aqui</p>
        </div>
    );
};

export default ImageUploader;
