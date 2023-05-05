import "./App.css";

// Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Hooks
import { useAuth } from "./hooks/useAuth";

// Components
//import Navbar from "./components/Navbar/Navbar"
//import Footer from "./components/Footer/Footer"

//Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Carousel from "./pages/Carousel/Carousel";

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={auth ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/home"
              element={auth ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!auth ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/carousel"
              element={auth ? <Carousel /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
