import "./App.css";

// Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Hooks
import { useAuth } from "./hooks/useAuth";
import { useSelector } from "react-redux";

//Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Carousel from "./pages/Carousel/Carousel";

function App() {
  const { auth, loading } = useAuth();
  const { user } = useSelector((state) => state.auth);

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
              element={
                auth ? (
                  <Navigate to={`/home/${user._id}`} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/home/:id"
              element={auth ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!auth ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/carousel/:id"
              element={auth ? <Carousel /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
