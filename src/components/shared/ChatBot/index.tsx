"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const ChatBot = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      const userMessage = { role: "user", content: input };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);

      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/chatbot/message",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chatHistory: messages,
              userPrompt: input,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to get response");
        }

        const data = await response.json();
        const assistantMessage = {
          role: "assistant",
          content: data.assistantResponse,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        console.error("Error:", error);
        // Optionally, add an error message to the chat
        setMessages((prev) => [
          ...prev,
          {
            role: "system",
            content: "Sorry, there was an error processing your request.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col">
      <ScrollArea
        className="flex-grow p-4 space-y-2 relative"
        ref={scrollAreaRef}
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <MessageCircle className="w-12 h-12 mb-4" />
            <p>Write a message to start a chat</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-4 my-4 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start space-x-2 gap-2 ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <Avatar>
                  <AvatarFallback>
                    {message.role === "user" ? "U" : "AI"}
                  </AvatarFallback>
                  <AvatarImage
                    src={
                      message.role === "user"
                        ? "/user-avatar.png"
                        : "/ai-avatar.png"
                    }
                  />
                </Avatar>
                <div
                  className={`p-2 rounded-lg ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarFallback>AI</AvatarFallback>
                <AvatarImage src="/ai-avatar.png" />
              </Avatar>
              <div className="p-2 rounded-lg bg-muted">
                <span className="animate-pulse">AI is typing...</span>
              </div>
            </div>
          </div>
        )}
      </ScrollArea>
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message here..."
            className="flex-grow"
          />
          <Button type="submit" disabled={isLoading}>
            Send
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ChatBot;
