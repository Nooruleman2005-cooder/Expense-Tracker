import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseconfig";
import { deleteDoc, updateDoc } from "firebase/firestore"; 
import {
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  addDoc,
  collection,
  query,
  orderBy,
} from "firebase/firestore";

const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [initialBalance, setInitialBalance] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        setCurrentUserId(userId);

        const balanceRef = doc(db, "users", userId);
        onSnapshot(balanceRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setBalance(data.balance || 0);
            setInitialBalance(data.initialBalance || 0);
          } else {
            setDoc(balanceRef, { balance: 0, initialBalance: 0 });
            setBalance(0);
            setInitialBalance(0);
          }
        });

        const txnRef = collection(db, "users", userId, "transactions");
        const q = query(txnRef, orderBy("timestamp", "desc"));
        onSnapshot(q, (snap) => {
          const txnList = snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            date: doc.data().timestamp.toDate().toLocaleString(),
          }));
          setTransactions(txnList);

          const spent = txnList.reduce((acc, txn) => (txn.type === "expense" ? acc + txn.amount : acc), 0);
          setTotalSpent(spent);
        });
      } else {
        setCurrentUserId(null);
        setBalance(null);
        setTransactions([]);
        setInitialBalance(0);
        setTotalSpent(0);
      }
    });

    return () => unsubscribeAuth();
  }, [])

  const addAmount = async (amount) => {
    const user = auth.currentUser;
    if (!user) return;

    const userId = user.uid;
    const userDoc = doc(db, "users", userId);
    const docSnap = await getDoc(userDoc);
    const currentBal = docSnap.exists() ? docSnap.data().balance || 0 : 0;

    await setDoc(userDoc, { balance: currentBal + amount }, { merge: true });
  };

  const addExpense = async (amount, note) => {
    const user = auth.currentUser;
    if (!user) return;

    const userId = user.uid;
    const txnRef = collection(db, "users", userId, "transactions");
    await addDoc(txnRef, {
      amount,
      note,
      type: "expense",
      timestamp: new Date(),
    });

    const userDoc = doc(db, "users", userId);
    const docSnap = await getDoc(userDoc);
    const currentBal = docSnap.exists() ? docSnap.data().balance || 0 : 0;

    await setDoc(userDoc, { balance: currentBal - amount }, { merge: true });
  };
  const deleteTransaction = async (txnId) => {
  const user = auth.currentUser;
  if (!user) return;

  const txnDocRef = doc(db, "users", user.uid, "transactions", txnId);
  await deleteDoc(txnDocRef);
};

const editTransaction = async (txnId, updatedData) => {
  const user = auth.currentUser;
  if (!user) return;

  const txnDocRef = doc(db, "users", user.uid, "transactions", txnId);
  const txnSnap = await getDoc(txnDocRef);

  if (!txnSnap.exists()) return;

  const oldTxn = txnSnap.data();
  const oldAmount = oldTxn.amount;
  const newAmount = updatedData.amount;

  await updateDoc(txnDocRef, {
    note: updatedData.note,
    amount: newAmount,
    timestamp: new Date(),
  });

  const balanceRef = doc(db, "users", user.uid);
  const balanceSnap = await getDoc(balanceRef);
  const currentBalance = balanceSnap.exists() ? balanceSnap.data().balance || 0 : 0;

  const balanceDifference = oldAmount - newAmount;
  const updatedBalance = currentBalance + balanceDifference;

  await updateDoc(balanceRef, {
    balance: updatedBalance,
  });
};



  const getBalance = () => balance;
  const getTransactions = () => transactions;
  const getInitialBalance = () => initialBalance;
  const getTotalSpent = () => totalSpent;

  return (
    <BalanceContext.Provider
      value={{
        currentUserId,
        getBalance,
        getTransactions,
        getInitialBalance,
        getTotalSpent,
        addExpense,
        addAmount,
        editTransaction,
        deleteTransaction
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => useContext(BalanceContext);
