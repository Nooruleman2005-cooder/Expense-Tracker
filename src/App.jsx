import './App.css';
import Main from './Components/Main';
import { BalanceProvider } from './Context/BalanceContext.jsx';

function App() {
  return (
    <BalanceProvider>
      <Main />
    </BalanceProvider>
  );
}

export default App;
