import Header from "./components/Header";
import Register from "./components/Register";
import { Routes , Route, BrowserRouter } from 'react-router-dom'
import Prueba from "./components/Prueba"
import Login from "./components/Login";
import ValidEmail from "./components/ValidEmail";
import { RegisterFormik } from "./components/RegisterFormik";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <h1>Registro Prueba</h1>
        <Routes>
          <Route path="/prueba" element={<Prueba/>}/>
          <Route path="/register" element={<RegisterFormik/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/validemail" element={<ValidEmail/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
