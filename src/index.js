import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import axios from 'axios';


// axios.defaults.baseURL = "https://thmr.pythonanywhere.com";
axios.defaults.baseURL = "http://127.0.0.1:8000";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <AuthProvider>
                <App />
            </AuthProvider>
        </Router>
    </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
