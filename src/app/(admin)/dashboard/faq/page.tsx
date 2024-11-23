"use client";

import { useState, useEffect, FormEvent } from "react";

interface IFaq {
  _id: string;
  question: string;
  answer: string;
}

const Faqs = () => {
  const [faqs, setFaqs] = useState<IFaq[]>([]);
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [editId, setEditId] = useState<string | null>(null);

  // Fetch all FAQs
  const fetchFaqs = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/faq");
      if (!response.ok) {
        throw new Error("Failed to fetch FAQs");
      }
      const data: IFaq[] = await response.json();
      setFaqs(data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  // Handle form submission for both create and update
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const endpoint = editId
      ? `http://localhost:3000/api/v1/faq/${editId}`
      : "http://localhost:3000/api/v1/faq/create";
    const method = editId ? "PUT" : "POST";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editId ? "update" : "create"} FAQ`);
      }

      setQuestion("");
      setAnswer("");
      setEditId(null);
      fetchFaqs();
    } catch (error) {
      console.error(`Error ${editId ? "updating" : "creating"} FAQ:`, error);
    }
  };

  // Edit an existing FAQ
  const handleEdit = (faq: IFaq) => {
    setEditId(faq._id);
    setQuestion(faq.question);
    setAnswer(faq.answer);
  };

  // Delete an FAQ
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/faq/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete FAQ");
      }

      fetchFaqs();
    } catch (error) {
      console.error("Error deleting FAQ:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">FAQs</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editId ? "Update" : "Add"} FAQ
        </button>
      </form>
      <ul>
        {faqs.map((faq) => (
          <li
            key={faq._id}
            className="flex justify-between items-center mb-4 border p-4 rounded"
          >
            <div>
              <strong>{faq.question}</strong>: {faq.answer}
            </div>
            <div>
              <button
                onClick={() => handleEdit(faq)}
                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(faq._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Faqs;
