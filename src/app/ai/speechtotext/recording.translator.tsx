import React, { useState, useRef } from 'react';
import { MediaRecorder as ExtendableMediaRecorder, register } from 'extendable-media-recorder';
import { connect } from 'extendable-media-recorder-wav-encoder';
// import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';


const AudioRecorder: React.FC = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioBlobsRef = useRef<Blob[]>([]);
    const capturedStreamRef = useRef<MediaStream | null>(null);

    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);

    // Register the WAV encoder
    React.useEffect(() => {
        const initialize = async () => {
            try {
                await register(await connect());
            } catch (error) {
                console.error('Error registering WAV encoder:', error);
            }
        };
        initialize();
    }, []);

    // Start Recording
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                },
            });

            audioBlobsRef.current = [];
            capturedStreamRef.current = stream;

            if (!ExtendableMediaRecorder.isTypeSupported('audio/wav')) {
                throw new Error('WAV recording is not supported in this browser');

            }
            const mimeType = MediaRecorder.isTypeSupported('audio/webm')
                ? 'audio/webm'
                : 'audio/ogg';

            const mediaRecorder = new MediaRecorder(stream, { mimeType });


            mediaRecorder.addEventListener('dataavailable', (event) => {
                if (event.data.size > 0) {
                    audioBlobsRef.current.push(event.data);
                }
            });
            mediaRecorderRef.current = mediaRecorder;


            mediaRecorder.start();


            setIsRecording(true);

            // Stop the recording automatically after 60 seconds
            setTimeout(() => {
                if (mediaRecorder.state === "recording") {
                    stopRecording();
                    uploadAudio();
                }
            }, 5000);
        } catch (error) {
            console.error('Error starting recording:', error);
        }
    };

    // Stop Recording
    const stopRecording = async () => {
        return new Promise<void>((resolve) => {
            if (!mediaRecorderRef.current) {
                resolve();
                return;
            }

            mediaRecorderRef.current.addEventListener('stop', () => {
                const mimeType = mediaRecorderRef.current!.mimeType;
                const audioBlob = new Blob(audioBlobsRef.current, { type: mimeType });
                setAudioBlob(audioBlob);
                setAudioUrl(URL.createObjectURL(audioBlob));

                if (capturedStreamRef.current) {
                    capturedStreamRef.current.getTracks().forEach((track) => track.stop());
                }

                mediaRecorderRef.current = null;
                setIsRecording(false);
                resolve();
            });

            mediaRecorderRef.current.stop();
        });
    };

    // Convert WebM or OGG to WAV using FFmpeg.js
    // const convertToWav = async (audioBlob: Blob) => {
    //     try {
    //         // Load FFmpeg.js if not loaded yet
    //         if (!ffmpeg.isLoaded()) {
    //             await ffmpeg.load();
    //         }

    //         // Convert the blob to WAV format
    //         const file = new File([audioBlob], 'audio.webm', { type: 'audio/webm' });
    //         await ffmpeg.FS('writeFile', 'input.webm', await fetchFile(file));

    //         // Run FFmpeg to convert it to WAV
    //         await ffmpeg.run('-i', 'input.webm', 'output.wav');

    //         // Retrieve the output WAV file from FFmpeg's virtual filesystem
    //         const outputWav = ffmpeg.FS('readFile', 'output.wav');

    //         // Convert the output WAV file into a Blob
    //         const wavBlob = new Blob([outputWav.buffer], { type: 'audio/wav' });

    //         return wavBlob;
    //     } catch (error) {
    //         console.error('Error converting to WAV:', error);
    //         throw error;
    //     }
    // };

    // Upload Audio
    const uploadAudio = async () => {
        console.log('Uploading audio...', audioBlob);
        if (!audioBlob) {
            alert('No audio recorded to upload!');
            return;
        }

        setUploadStatus('Uploading...');
        try {
            const response = await uploadBlob(audioBlob, 'wav');
            setUploadStatus(`Upload successful: ${response.message}`);
        } catch (error) {
            setUploadStatus('Upload failed. Please try again.');
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Audio Recorder and Uploader</h1>
            <h1>{uploadStatus}</h1>

            {/* Start Recording Button */}
            {!isRecording && (
                <button
                    onClick={startRecording}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: '#4CAF50',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        margin: '10px',
                    }}
                >
                    Start Recording
                </button>
            )}

            {/* Stop Recording Button */}
            {isRecording && (
                <button
                    onClick={stopRecording}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: '#f44336',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        margin: '10px',
                    }}
                >
                    Stop Recording
                </button>
            )}

            {/* Audio Player */}
            {audioBlob && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Recorded Audio</h2>
                    <audio controls src={audioUrl || ''} style={{ display: 'block', marginBottom: '10px' }}></audio>
                    <button
                        onClick={uploadAudio}
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#2196F3',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Upload Audio
                    </button>
                </div>
            )}

            {/* Upload Status */}
            {uploadStatus && <p style={{ marginTop: '20px', color: '#555' }}>{uploadStatus}</p>}
        </div>
    );
};

export default AudioRecorder;

// Upload Blob Function
async function uploadBlob(audioBlob: Blob, fileType: string = 'wav'): Promise<any> {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'file');
    formData.append('type', fileType);

    const apiUrl = 'http://localhost:3000/api/v1/azure/speech-translate';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            cache: 'no-cache',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Upload failed:', error);
        throw error; // Let the caller handle the error
    }
}
