import React, { useEffect, useState } from "react";
import { useBalance } from "../Context/BalanceContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseconfig.js";

const Transactions = () => {
  const { getTransactions, deleteTransaction, editTransaction } = useBalance();
  const [editingId, setEditingId] = useState(null);
  const [editNote, setEditNote] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const transactions = getTransactions();
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      navigate("/login");
    }
  }, [navigate]);

  const handleDelete = (id) => {
    deleteTransaction(id);
  };

  const startEdit = (txn) => {
    setEditingId(txn.id);
    setEditNote(txn.note);
    setEditAmount(txn.amount);
  };

  const handleEditSave = () => {
    editTransaction(editingId, {
      note: editNote,
      amount: parseFloat(editAmount),
      date: new Date().toLocaleDateString(),
    });
    setEditingId(null);
    setEditNote("");
    setEditAmount("");
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Your Transactions</h2>
      {transactions.length === 0 ? (
        <p className="mt-50 text-xl font-bold text-red-600">No transactions found.</p>
      ) : (
        <ul className="space-y-3 mb-30">
          {transactions?.map((txn) => (
            <li
              key={txn.id}
              className="p-3 font-bold border rounded shadow-sm flex justify-between items-center"
            >
              {editingId === txn.id ? (
                <div className="flex flex-col w-full">
                  <input
                    value={editNote}
                    onChange={(e) => setEditNote(e.target.value)}
                    className="mb-1 p-1 border rounded"
                  />
                  <input
                    type="number"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    className="mb-1 p-1 border rounded"
                  />
                  <button
                    onClick={handleEditSave}
                    className="bg-green-600 text-white px-2 py-1 rounded text-sm"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row sm:justify-between w-full">
                    <div className="mb-1">
                      <span className="block font-bold">{txn.note}</span>
                      <p className="text-red-600 font-bold">- ${txn.amount}</p>
                      <p className="text-sm text-gray-500 font-bold mt-1">{txn.date}</p>
                    </div>

                    <div className="flex sm:flex-row flex-col gap-2 mt-2 sm:mt-0 sm:items-center">
                      <button
                        onClick={() => startEdit(txn)}
                        className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(txn.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>

              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Transactions;
