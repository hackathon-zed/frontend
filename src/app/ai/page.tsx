import Link from "next/link";
import React from "react";


interface AiFeatureCardProps {
    title: string;
    description: string;
    icon: string;
    link: string;
}

const AiFeatureCard = ({ title, description, icon, link }: AiFeatureCardProps) => (
    <Link href={link}>
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center transition-transform transform hover:scale-105">
            <div className="text-4xl mb-4">{icon}</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
            <p className="text-center text-gray-600">{description}</p>
        </div>
    </Link>
);

export default function AiFeatureDashBoard() {
    const features = [
        {
            title: "Chatbot",
            description: "Engage with an intelligent chatbot for automated responses and support.",
            icon: "💬",
            link: "/ai/chatbot",
        },
        {
            title: "Speech to Text",
            description: "Convert spoken words into text seamlessly and accurately.",
            icon: "🎤",
            link: "/ai/speechtotext",
        },
        {
            title: "Image Recognition",
            description: "Analyze and identify objects in images with AI.",
            icon: "🖼️",
            link: "/ai/imagerecognization",
        },
        {
            title: "Sentiment Analysis",
            description: "Understand emotions in text with sentiment analysis.",
            icon: "📊",
            link: "/sentiment-analysis",
        },
        {
            title: "Text Summarization",
            description: "Condense large texts into concise summaries.",
            icon: "✂️",
            link: "/text-summarization",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">AI Features Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
                {features.map((feature, index) => (
                    <AiFeatureCard
                        key={index}
                        title={feature.title}
                        description={feature.description}
                        icon={feature.icon}
                        link={feature.link}
                    />
                ))}
            </div>
        </div>
    );
}
