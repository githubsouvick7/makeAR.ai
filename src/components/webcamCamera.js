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
  width: 300px; /* Set your desired width here */
  height: 500px; /* Set your desired height here */
  margin: 0 auto;
  overflow: hidden; /* Hide video overflow if necessary */
  position: relative; /* Add position relative for absolute positioning */
`;

const Video = styled.video`
  width: 100%;
  max-width: 100%;
  height: calc(70% - 48px); /* 70% of container height minus button and padding */
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
  width: 100%;
  max-width: 300px; /* Adjust the width as needed */
  margin: 16px auto;
`;

const CapturedImage = styled.img`
  max-width: 100px; /* Adjust the maximum width as needed */
  max-height: 100px; /* Set the maximum height as needed */
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
`;

const PlaceholderImage = styled.img`
  cursor: pointer;
`;

const WebcamCapture = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [imageData, setImageData] = useState(null);

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
            // Create an anchor element
            const anchor = document.createElement('a');
            anchor.href = imageData;
            anchor.download = 'captured_image.png'; // You can customize the filename here
            document.body.appendChild(anchor);

            // Trigger a click event on the anchor element
            anchor.click();

            // Remove the anchor element from the DOM
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
            <CaptureButton onClick={captureImage}>Capture Selfie</CaptureButton>
            {imageData ? (
                <>
                    <CapturedImageContainer>
                        <CapturedImage src={imageData} alt="Captured" onClick={openCamera} />
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
                </>
            )}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </WebcamContainer>
    );
};

export default WebcamCapture;
