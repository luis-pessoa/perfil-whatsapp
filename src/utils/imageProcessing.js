
export const removeWhiteBackground = (imageSrc) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = imageSrc;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            // Tolerance for "white"
            const threshold = 240;

            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                // If pixel is close to white, make it transparent
                if (r > threshold && g > threshold && b > threshold) {
                    data[i + 3] = 0; // Alpha to 0
                }
            }

            ctx.putImageData(imageData, 0, 0);
            resolve(canvas.toDataURL("image/png"));
        };
        img.onerror = (err) => reject(err);
    });
};

export const readFile = (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => resolve(reader.result), false);
        reader.readAsDataURL(file);
    });
};

export const getCroppedImg = async (imageSrc, pixelCrop, frameSrc) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 192;
    canvas.height = 192;

    // Draw user image
    // pixelCrop gives { x, y, width, height } of the source image that should be visible

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        192,
        192
    );

    // Draw frame on top
    if (frameSrc) {
        const frame = await createImage(frameSrc);
        ctx.drawImage(frame, 0, 0, 192, 192);
    }

    return new Promise((resolve) => {
        canvas.toBlob((file) => {
            resolve(URL.createObjectURL(file));
        }, 'image/png');
    });
};

const createImage = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous');
        image.src = url;
    });
