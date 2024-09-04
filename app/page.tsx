"use client";

import { createExampleAction, deleteExampleAction, getAllExamplesAction, getExampleByIdAction, updateExampleAction } from "@/actions/example-actions";
import { ActionState } from "@/types";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<ActionState | null>(null);
  const [formData, setFormData] = useState({ name: "", age: "", email: "" });
  const [exampleId, setExampleId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createExampleAction({
      name: formData.name,
      age: parseInt(formData.age),
      email: formData.email,
    });
    setResult(res);
    if (res.status === "success" && res.data) {
      setExampleId(res.data.id);
    }
  };

  const handleGetAll = async () => {
    const res = await getAllExamplesAction();
    setResult(res);
  };

  const handleGetById = async () => {
    if (!exampleId) {
      setResult({ status: "error", message: "Please create an example first or enter a valid UUID" });
      return;
    }
    const res = await getExampleByIdAction(exampleId);
    setResult(res);
  };

  const handleUpdate = async () => {
    if (!exampleId) {
      setResult({ status: "error", message: "Please create an example first or enter a valid UUID" });
      return;
    }
    const res = await updateExampleAction(exampleId, { name: "Updated Name" });
    setResult(res);
  };

  const handleDelete = async () => {
    if (!exampleId) {
      setResult({ status: "error", message: "Please create an example first or enter a valid UUID" });
      return;
    }
    const res = await deleteExampleAction(exampleId);
    setResult(res);
    if (res.status === "success") {
      setExampleId("");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Example Actions</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mr-2 p-2 border text-black"
        />
        <input
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          className="mr-2 p-2 border text-black"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mr-2 p-2 border text-black"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white">Create Example</button>
      </form>
      <div className="space-x-2 mb-4">
        <button onClick={handleGetAll} className="p-2 bg-green-500 text-white">Get All Examples</button>
        <button onClick={handleGetById} className="p-2 bg-yellow-500 text-white">Get Example by ID</button>
        <button onClick={handleUpdate} className="p-2 bg-orange-500 text-white">Update Example</button>
        <button onClick={handleDelete} className="p-2 bg-red-500 text-white">Delete Example</button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Example ID (UUID)"
          value={exampleId}
          onChange={(e) => setExampleId(e.target.value)}
          className="p-2 border text-black"
        />
      </div>
      {result && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Result:</h2>
          <pre className="bg-gray-100 p-2 rounded text-black">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}