import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const WebcamContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background-color: #000;
  color: #fff;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 100%; /* Set your desired width here */
  height: 100%; /* Set your desired height here */
  margin: 0 auto;
  overflow: hidden; /* Hide video overflow if necessary */
  position: relative; /* Add position relative for absolute positioning */
`;

const Video = styled.video`
  width: 100%;
  max-width: 100%;
  height: calc(90% - 48px); /* 70% of container height minus button and padding */
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
`;

const CaptureButton = styled.button`
  background-color: #fff;
  color: #000;
  border: none;
  padding: 8px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: bold;

  &:hover {
    background-color: #ccc;
  }
`;

const DownloadButton = styled.button`
  background-color: #fff;
  color: #000;
  border: none;
  padding: 8px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: bold;
  margin-top: 10px;

  &:hover {
    background-color: #ccc;
  }
`;

const CapturedImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px; /* Adjust the width as needed */
  margin: 16px auto;
`;

const CapturedImageWithText = styled.img`
  width: 80px;
  max-width: 80px;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
`;

const ImageTextOverlay = styled.div`
  position: absolute;
  bottom: 10px; /* Adjust the position as needed */
  left: 10px; /* Adjust the position as needed */
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 4px 8px;
  border-radius: 5px;
`;

const PlaceholderImage = styled.img`
  cursor: pointer;
`;

const NameInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 10px;
`;

const WebcamCapture = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [imageData, setImageData] = useState(null);
    const [name, setName] = useState('');
    const [captureDisabled, setCaptureDisabled] = useState(true); // Disable capture initially

    useEffect(() => {
        const startWebcam = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoRef.current.srcObject = stream;
            } catch (error) {
                console.error('Error accessing webcam:', error);
            }
        };

        startWebcam();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject;
                const tracks = stream.getTracks();

                tracks.forEach((track) => {
                    track.stop();
                });
            }
        };
    }, []);

    useEffect(() => {
        // Enable the capture button when the name is not empty
        setCaptureDisabled(name.trim() === '');
    }, [name]);

    const captureImage = () => {
        if (videoRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

            const imageDataURL = canvas.toDataURL('image/png');
            setImageData(imageDataURL);
        }
    };

    const downloadImage = () => {
        if (imageData) {
            const anchor = document.createElement('a');
            anchor.href = imageData;
            anchor.download = 'captured_image.png';
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
        }
    };

    const openCamera = () => {
        if (videoRef.current && canvasRef.current) {
            videoRef.current.style.display = 'block';
            canvasRef.current.style.display = 'none';
        }
    };

    return (
        <WebcamContainer>
            <Video ref={videoRef} autoPlay muted />
            <CaptureButton onClick={captureImage} disabled={captureDisabled}>
                Capture Selfie
            </CaptureButton>
            {imageData ? (
                <>
                    <CapturedImageContainer>
                        <CapturedImageWithText src={imageData} alt="Captured" onClick={openCamera} />
                        <ImageTextOverlay>{name}</ImageTextOverlay>
                    </CapturedImageContainer>
                    <DownloadButton onClick={downloadImage}>Download Image</DownloadButton>
                </>
            ) : (
                <>
                    <PlaceholderImage
                        src="placeholder-image.jpg" // Replace with your placeholder image URL
                        alt="Placeholder"
                        onClick={openCamera}
                    />
                    <NameInput
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </>
            )}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </WebcamContainer>
    );
};

export default WebcamCapture;
