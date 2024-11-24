"use client";

import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AudioRecorder from './recording.translator';
export default function Page() {

  const [file, setSelectedFile] = useState(null as File | null);
  const [isLoading, setIsLoading] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Safely access the first file
    if (file) {
      setSelectedFile(file); // Update state with the selected file
      console.log("File selected:", file.name);
    } else {
      console.error("No file selected.");
      setSelectedFile(null); // Reset state to null
    }
  };

  console.log("file", file);

  const handleTranslate = async () => {

    console.log("file in handleTranslate", file);
    if (!file) {
      setError('Please select an audio file first');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      const formData = new FormData();
      formData.append('audio', file);

      const response = await fetch('http://localhost:3000/api/v1/azure/speech-translate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Translation failed: ${response.statusText}`);
      }

      const data = await response.json();
      setTranslatedText(data.translatedText);
    } catch (err: any) {
      setError(err.message || 'An error occurred during translation');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Audio to Hindi Translation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center gap-4">
          <div>
            <AudioRecorder />
          </div>
          <label
            htmlFor="audio-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-2 text-gray-500" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">WAV files only</p>
            </div>
            <input
              id="audio-upload"
              type="file"
              accept=".wav"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {file && (
            <p className="text-sm text-gray-500">
              Selected file: {file.name}
            </p>
          )}

          <Button
            onClick={handleTranslate}
            disabled={!file || isLoading}
            className="w-full max-w-xs"
          >
            {isLoading ? 'Translating...' : 'Translate Audio'}
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {translatedText && (
            <div className="w-full p-4 mt-4 border rounded-lg">
              <h3 className="mb-2 font-semibold">Translation Result:</h3>
              <p className="text-gray-700">{translatedText}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
