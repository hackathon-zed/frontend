"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export default function Faqs() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    const response = await fetch("http://localhost:3000/api/v1/faq");
    const data = await response.json();
    setFaqs(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await fetch(`http://localhost:3000/api/v1/faq/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, question, answer }),
      });
    } else {
      await fetch("http://localhost:3000/api/v1/faq/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer }),
      });
    }
    setQuestion("");
    setAnswer("");
    setEditingId(null);
    fetchFAQs();
  };

  const handleEdit = (faq: FAQ) => {
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setEditingId(faq.id);
  };

  const handleDelete = async (id: number) => {
    await fetch("http://localhost:3000/api/v1/faq", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchFAQs();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">FAQ Manager</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <Input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Question"
          className="mb-2"
          required
        />
        <Textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Answer"
          className="mb-2"
          required
        />
        <Button type="submit">{editingId ? "Update FAQ" : "Add FAQ"}</Button>
      </form>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <Card key={faq.id}>
            <CardHeader>
              <CardTitle>{faq.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{faq.answer}</p>
              <div className="space-x-2">
                <Button onClick={() => handleEdit(faq)} variant="outline">
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(faq.id)}
                  variant="destructive"
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
