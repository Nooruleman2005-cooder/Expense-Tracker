import React, { useState, useEffect } from "react";
import { useBalance } from "../Context/BalanceContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseconfig.js";

function AddTransaction() {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const { addExpense } = useBalance();
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      navigate("/login"); 
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = parseFloat(amount);
    if (!value || value <= 0) return alert("Enter a valid amount");

    addExpense(value, note); 
    alert("Transaction added successfully!");
    setAmount("");
    setNote("");
    navigate("/home");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded max-w-md mx-auto mt-40">
      <h2 className="text-lg font-semibold mb-2">Add a Transaction</h2>
      <input
        type="number"
        placeholder="Enter expense amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border mb-3 rounded"
        required
      />
      <input
        type="text"
        placeholder="Note (e.g. groceries)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full p-2 border mb-3 rounded"
        required
      />
      <button
        type="submit"
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Submit
      </button>
    </form>
  );
}

export default AddTransaction;
