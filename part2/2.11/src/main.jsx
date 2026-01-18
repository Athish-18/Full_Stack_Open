// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import axios from "axios";

// // const promise = axios.get("http://localhost:3001/notes");
// // console.log(promise);

// axios.get("http://localhost:3001/notes")
// .then(response=>
// {
//   const notes=response.data;
//   console.log("this is response.data" ,notes);
//   console.log("this is response object" ,response);
// }
// )

// const promise2 = axios.get("http://localhost:3001/foobar");
// console.log(promise2);
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

// import ReactDOM from "react-dom/client";
// import axios from "axios";
// import App from "./App";

import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
