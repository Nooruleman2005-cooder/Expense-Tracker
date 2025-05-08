import React, { useState, useEffect } from "react";
import { useBalance } from "../Context/BalanceContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseconfig.js";

function AddExpense() {
  const [amount, setAmount] = useState("");
  const { addAmount } = useBalance();
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      navigate("/login"); 
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount.trim() === "") return;

    const parsed = parseFloat(amount);
    if (isNaN(parsed) || parsed <= 0) return;

    addAmount(parsed);
    alert("Amount added successfully!");
    setAmount("");
    navigate("/home");
  };

  return (
    <div className="my-4">
      <form onSubmit={handleSubmit} className="mt-40 bg-gray-100 p-4 rounded shadow">
        <label className="block mb-2 font-medium text-gray-700">
          Add Amount
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
          placeholder="Enter amount"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddExpense;
