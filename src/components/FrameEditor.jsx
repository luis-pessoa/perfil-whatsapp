import React, { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg, removeWhiteBackground } from '../utils/imageProcessing';
import frameImageRaw from '../assets/frame.jpg';

const FrameEditor = ({ imageSrc, onReset }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [processedFrame, setProcessedFrame] = useState(null);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    useEffect(() => {
        const processFrame = async () => {
            try {
                const transparentFrame = await removeWhiteBackground(frameImageRaw);
                setProcessedFrame(transparentFrame);
            } catch (error) {
                console.error("Failed to process frame:", error);
            }
        };
        processFrame();
    }, []);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleDownload = async () => {
        try {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, processedFrame);
            const link = document.createElement('a');
            link.href = croppedImage;
            link.download = 'minha-foto-com-moldura.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (e) {
            console.error(e);
        }
    };

    if (!processedFrame) {
        return <div className="text-center p-4">Carregando moldura...</div>;
    }

    return (
        <div className="flex flex-col items-center w-full max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ajuste sua Foto</h2>

            <div className="relative w-[300px] h-[300px] bg-gray-200 rounded-lg overflow-hidden mb-6 shadow-inner border border-gray-300">
                <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    showGrid={false}
                    cropShape="round"
                    objectFit="cover"
                />
                {/* Overlay Frame */}
                <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
                    <img
                        src={processedFrame}
                        alt="Frame"
                        className="w-full h-full object-contain"
                        style={{ opacity: 1 }}
                    />
                </div>
            </div>

            <div className="w-full px-4 mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Zoom</label>
                <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e) => setZoom(e.target.value)}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
            </div>

            <div className="flex gap-4 w-full">
                <button
                    onClick={onReset}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                    Voltar
                </button>
                <button
                    onClick={handleDownload}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold shadow-md transform hover:scale-105 duration-200"
                >
                    Baixar Foto
                </button>
            </div>
        </div>
    );
};

export default FrameEditor;
