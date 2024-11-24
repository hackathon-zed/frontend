import ChatBot from "@/components/shared/ChatBot";
import React from "react";

export default function ChatbotPage() {
    return (
        <div className=" bg-gray-50 flex flex-col items-center p-6">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
                <header className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-blue-600 mb-2">
                        Chatbot Assistant
                    </h1>
                    <p className="text-gray-600">
                        Engage with your smart assistant for real-time support and solutions.
                    </p>
                </header>
                <div className="relative">
                    {/* Chat Interface */}
                    <div className="bg-gray-100 p-4 rounded-md shadow-inner h-4/5 overflow-y-auto">
                        <ChatBot />
                    </div>

                </div>
            </div>
        </div>
    );
}
