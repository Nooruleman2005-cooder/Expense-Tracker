import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useBalance } from '../Context/BalanceContext';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const Home = () => {
  const { getBalance, currentUserId, getTotalSpent, getInitialBalance } = useBalance();
  const [percentage, setPercentage] = useState(0);
  const balance = getBalance();
  const spent = getTotalSpent();
  const storedInitial = getInitialBalance();

  const initial = storedInitial > 0 ? storedInitial : (balance !== null && spent !== null ? balance + spent : 0);

  useEffect(() => {
    if (initial > 0) {
      const newPercentage = (spent / initial) * 100;
      setPercentage(newPercentage);
      console.log(`Initial: ${initial}, Spent: ${spent}, %: ${newPercentage}`);
    } else {
      setPercentage(0);
      console.log("Initial balance could not be determined.");
    }
  }, [initial, spent]);

  return (
    <>
      <Header />
      <Sidebar />

      <div className="pt-20 pb-20 px-4 text-left md:ml-64 home">
        <h1 className="text-2xl font-bold mb-4">Current Balance</h1>

        {currentUserId ? (
          balance !== null ? (
            <>
              <p className="text-2xl font-semibold text-green-600 mb-4">
                ${balance.toFixed(2)}
              </p>

              <div className="mx-auto mt-12 w-32 h-32 md:w-[200px] md:h-[200px]">
                <CircularProgressbar
                   value={percentage}
                   text={`${percentage.toFixed(0)}%`}
                   styles={buildStyles({
                    pathColor: percentage > 70 ? 'red' : 'orange',
                    trailColor: 'gray',
                    textColor: '#333',
                  })}
                />
              </div>
            </>
          ) : (
            <p>Loading balance...</p>
          )
        ) : (
          <h3 className="text-2xl font-bold mb-4">Your Balance Show Here.....</h3>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Home;
