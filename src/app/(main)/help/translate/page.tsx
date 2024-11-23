"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TranslateAudioPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBuffer, setAudioBuffer] = useState<Blob | null>(null);
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        setAudioBuffer(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setError("Could not access the microphone. Please check your settings.");
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  }, [isRecording]);

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setError(null);
      }
    },
    []
  );

  const translateAudio = useCallback(async () => {
    if (!audioBuffer) return;

    setIsTranslating(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("audio", audioBuffer, "audio.wav");

      const response = await fetch(
        "http://localhost:3000/api/v1/azure/speech-translate", // Ensure the URL matches your backend
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to process the audio file.");
      }

      const data = await response.json(); // Assuming the backend returns JSON
      if (data.text) {
        setTranslatedText(data.text); // Assuming the text result is returned in a `text` field
      } else {
        throw new Error("No text result in the response.");
      }
    } catch (err) {
      console.error("Error translating audio:", err);
      setError("An error occurred during audio processing. Please try again.");
    } finally {
      setIsTranslating(false);
    }
  }, [audioBuffer]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-4 p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold text-center">Audio to Text Converter</h1>

      {/* Recording Controls */}
      <div className="space-y-2">
        <Button onClick={isRecording ? stopRecording : startRecording}>
          {isRecording ? "Stop Recording" : "Start Recording"}
        </Button>
        {isRecording && (
          <div>
            <Progress value={(recordingTime / 60) * 100} className="w-full" />
            <p className="text-sm text-gray-600">
              Recording Time: {recordingTime}s
            </p>
          </div>
        )}
      </div>

      {/* Original Audio */}
      {audioBuffer && (
        <div className="space-y-2">
          <h3 className="font-semibold">Original Audio</h3>
          <audio
            src={URL.createObjectURL(audioBuffer)}
            controls
            className="w-full"
          />
        </div>
      )}

      {/* File Upload */}
      <div className="space-y-2">
        <Label htmlFor="audio-upload">Upload Audio File</Label>
        <Input
          id="audio-upload"
          type="file"
          accept="audio/*"
          onChange={handleFileUpload}
        />
      </div>

      {/* Translate Button */}
      {audioBuffer && (
        <div className="space-y-2">
          <Button
            onClick={translateAudio}
            disabled={isTranslating || !audioBuffer}
          >
            {isTranslating ? "Processing..." : "Convert to Text"}
          </Button>
        </div>
      )}

      {/* Translated Text */}
      {translatedText && (
        <div className="space-y-2">
          <h3 className="font-semibold">Converted Text</h3>
          <div className="p-2 border border-gray-300 rounded-md bg-gray-50">
            <p className="text-gray-800">{translatedText}</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded-lg">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
