import "./App.css";

// Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Hooks
//import { useAuth } from "./hooks/useAuth";

// Components
//import Navbar from "./components/Navbar/Navbar"
//import Footer from "./components/Footer/Footer"

//Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Carousel from "./pages/Carousel/Carousel";
//import Carrosel from "./components/Carrosel"

function App() {
  {
    /*const { auth, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>
  }*/
  }
  return (
    <div className="App">
      <BrowserRouter>
        {/*<Navbar />*/}
        {/* element={auth ? <Home /> : <Navigate to="/login" />}*/}
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/carousel" element={<Carousel />} />
          </Routes>
        </div>
        {/*<Footer />*/}
      </BrowserRouter>
    </div>
  );
}

export default App;
