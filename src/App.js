import './App.css';
import Router from './Router';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="max-w-[1890px] mx-auto">
      <Router />
      <ToastContainer rtl />
    </div>
  );
}

export default App;
