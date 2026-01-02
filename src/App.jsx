import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import FrameEditor from './components/FrameEditor';
import { readFile } from './utils/imageProcessing';

function App() {
    const [imageSrc, setImageSrc] = useState(null);

    const onUpload = async (file) => {
        const imageDataUrl = await readFile(file);
        setImageSrc(imageDataUrl);
    };

    const onReset = () => {
        setImageSrc(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">
                        Gerador de Perfil
                    </h1>
                    <p className="mt-2 text-base text-gray-600">
                        Crie seu avatar personalizado para whatsapp
                    </p>
                </div>

                <div className="mt-8">
                    {!imageSrc ? (
                        <ImageUploader onUpload={onUpload} />
                    ) : (
                        <FrameEditor imageSrc={imageSrc} onReset={onReset} />
                    )}
                </div>

                <div className="text-center text-xs text-gray-400 mt-8">
                    <p>© 2026 Campanha Oficial Professor Penildon. Todos os direitos reservados.</p>
                </div>
            </div>
        </div>
    );
}

export default App;
