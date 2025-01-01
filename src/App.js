import './App.css';
import Router from './Router';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="App">
      <Router />
      <ToastContainer rtl />
    </div>
  );
}

export default App;
