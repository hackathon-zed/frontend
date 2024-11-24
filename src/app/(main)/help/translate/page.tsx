"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { ChangeEvent, useState } from "react";

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  return URL.createObjectURL(event.target.files![0]);
}

const TranslateAudioPage: React.FC = () => {
  const [preview, setPreview] = useState<string>("");

  const sendAudio = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/azure/speech-translate",
        {
          method: "POST",
          body: JSON.stringify(preview),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Translation result:", result);
    } catch (error) {
      console.error("Error sending audio:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-bold">Speech-to-Text Translator</h1>

      <div className="mt-4">
        <Input
          type="file"
          name="imageUrl"
          onChange={(event) => {
            const displayUrl = getImageData(event);
            setPreview(displayUrl);
          }}
          className="h-40 flex items-center justify-center cursor-pointer outline-dashed outline-4 outline-primary ring-0 border-collapse"
        />
      </div>
      <Button onClick={sendAudio}>Translate</Button>
    </div>
  );
};

export default TranslateAudioPage;
