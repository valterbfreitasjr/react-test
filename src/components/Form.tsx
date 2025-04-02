import React, { useState, useEffect } from "react";
import Button from "./Button";

const Form = () => {
  const [inputValue, setInputValue] = useState("");
  const [submittedValues, setSubmittedValues] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Busca os dados iniciais da API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=5"
        );
        const data = await response.json();
        const titles = data.map((item: { title: string }) => item.title);
        setSubmittedValues(titles);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue) {
      if (editingIndex !== null) {
        // Editar item existente
        const updatedValues = [...submittedValues];
        updatedValues[editingIndex] = inputValue;
        setSubmittedValues(updatedValues);
        setEditingIndex(null);
      } else {
        // Adicionar novo item
        setSubmittedValues([...submittedValues, inputValue]);
      }
      setInputValue("");
    }
  };

  const handleEdit = (index: number) => {
    setInputValue(submittedValues[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const updatedValues = submittedValues.filter((_, i) => i !== index);
    setSubmittedValues(updatedValues);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4 text-lg text-center font-bold">
          <h1>Adicionar itens</h1>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="item" className="sr-only">
            Item
          </label>
          <input
            id="item"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter text"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            {editingIndex !== null ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">
              Submitted Values
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {submittedValues.map((value, index) => (
            <tr key={index} className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{value}</td>
              <td className="border border-gray-300 px-4 py-2 text-center space-x-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                  aria-label={`Editar item ${value}`}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  aria-label={`Excluir item ${value}`}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Form;
