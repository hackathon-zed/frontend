"use client";

import React, { useState } from 'react';

export default function ImageRecognization() {
    const [image, setImage] = useState<File | null>(null); // State to store the selected image
    const [result, setResult] = useState(""); // State to store the recognition result
    const [loading, setLoading] = useState(false); // State to show loading status

    // Handle file input change
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Get the selected file

        if (file) {
            setImage(file); // Set the image state
        }
    };

    // Handle form submission (upload image to the backend)
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent form submission

        if (!image) {
            alert('Please select an image to upload.');
            return;
        }

        setLoading(true); // Show loading indicator

        const formData = new FormData();
        formData.append('image', image); // Append the selected image to the form data

        try {
            // Send the image to the backend (replace the URL with your server's URL)
            const response = await fetch('http://localhost:3000/api/v1/genai/recognize', {
                method: 'POST',
                body: formData,
            });

            // Parse the JSON response
            const data = await response.json();
            setLoading(false); // Hide loading indicator

            if (response.ok) {
                setResult(data.description); // Set the recognition result
            } else {
                setResult("Error: " + data.message); // Set error message
            }
        } catch (error: any) {
            setLoading(false); // Hide loading indicator on error
            setResult('Error: ' + error.message); // Show error message
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
            <div className="bg-white p-10 rounded-lg shadow-xl w-full sm:w-96 space-y-6">
                <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-6">
                    Image Recognition
                </h1>

                {/* Form for image upload */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex justify-center">
                        <label
                            htmlFor="file-upload"
                            className="flex items-center justify-center w-32 h-32 border-4 border-dashed border-blue-500 bg-blue-50 rounded-full cursor-pointer hover:bg-blue-100"
                        >
                            <span className="text-blue-500 text-xl">📷</span>
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                            className="hidden"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md font-semibold text-lg transition-all duration-300 hover:from-blue-600 hover:to-indigo-600 disabled:bg-gray-400"
                    >
                        {loading ? 'Processing...' : 'Upload and Recognize'}
                    </button>
                </form>

                {/* Display the result */}
                {loading ? (
                    <div className="mt-4 animate-spin rounded-full border-t-4 border-indigo-500 w-12 h-12 mx-auto"></div>
                ) : (
                    result && (
                        <div className="mt-6 bg-indigo-50 p-4 rounded-lg border border-indigo-200 shadow-md">
                            <h3 className="text-2xl font-semibold text-indigo-600 mb-2">Recognition Result:</h3>
                            <p className="text-gray-700 text-lg">{result}</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
