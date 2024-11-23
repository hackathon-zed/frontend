"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SendIcon, SmileIcon } from "lucide-react";
import React, { useState } from "react";

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hello, how are you?",
      timestamp: "2:30 PM",
      isSent: false,
    },
    {
      id: 2,
      content: "I'm fine, thanks for asking!",
      timestamp: "2:31 PM",
      isSent: true,
    },
  ]);
  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = {
        id: messages.length + 1,
        content: message,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isSent: true,
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };
  const handleEmojiClick = (emoji: string) => {
    setMessage(message + emoji);
  };
  return (
    <div
      key="1"
      className="flex h-screen bg-white dark:bg-zinc-800 md:flex-row border-2"
    >
      <section className="flex flex-col w-full">
        <header className="border-b dark:border-zinc-700 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="relative overflow-visible w-10 h-10">
              <span className="absolute right-0 top-0 flex h-3 w-3 rounded-full bg-green-600" />
              <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              Contact Name
              <span className="text-xs text-green-600 block">Online</span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${
                  msg.isSent ? "justify-end" : ""
                }`}
              >
                <div
                  className={`rounded-lg p-2 ${
                    msg.isSent
                      ? "bg-blue-500 text-white"
                      : "bg-zinc-200 dark:bg-zinc-700"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
        <footer className="border-t dark:border-zinc-700 p-4">
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button size="icon" variant="ghost">
                  <SmileIcon className="w-6 h-6" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="grid grid-cols-8 gap-2 p-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEmojiClick("\uD83D\uDE00")}
                >
                  <span className="text-2xl">😀</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEmojiClick("\uD83D\uDE03")}
                >
                  <span className="text-2xl">😃</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEmojiClick("\uD83D\uDE04")}
                >
                  <span className="text-2xl">😄</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEmojiClick("\uD83D\uDE01")}
                >
                  <span className="text-2xl">😁</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEmojiClick("\uD83D\uDE06")}
                >
                  <span className="text-2xl">😆</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEmojiClick("\uD83D\uDE05")}
                >
                  <span className="text-2xl">😅</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEmojiClick("\uD83D\uDE02")}
                >
                  <span className="text-2xl">😂</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEmojiClick("\uD83E\uDD23")}
                >
                  <span className="text-2xl">🤣</span>
                </Button>
              </PopoverContent>
            </Popover>
            <Input
              className="flex-1"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={handleSendMessage}>
              <SendIcon className="w-5 h-5" />
            </Button>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default ChatBot;
