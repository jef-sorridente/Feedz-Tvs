import "./Auth.css";

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message/Message";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { login, reset } from "../../slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };
    dispatch(login(user));
  };

  // Limpar os States
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

     /*
  Botão para Modificar de Login p/ Cadastro
  const [myClass, setMyClass] = useState("primaria");
  function alternateClass() {
    if (myClass === "primaria") {
      setMyClass("secundaria");
    } else {
      setMyClass("primaria");
    }
  }
  useEffect(() => {
    const elemento = document.querySelector(".elemento-a-modificar");
    elemento.classList.remove("primaria");
    elemento.classList.remove("secundaria");
    elemento.classList.add(myClass);
  }, [myClass]);*/
    /* 
        Botão para Modificar de Login p/ Cadastro
      <div className="elemento-a-modificar">
        <button onClick={alternateClass}>Teste</button>
      </div>*/
      
  return (
    <div className="container-login">
      <div className="container-login-box">
        <div className="information">
          <h2>Feedz 3S</h2>
          <p>Bem vindo ao Feedz / Tvs</p>
        </div>
        <div className="login">
          <h2>Faça login para continuar!</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              value={email || ""}
              autoFocus
              className="input-text"
            />
            <input
              type="password"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
              value={password || ""}
              className="input-text"
            />
            {!loading && (
              <input type="submit" value="Entrar" className="btn-submit" />
            )}
            {loading && (
              <input
                type="submit"
                value="Aguarde..."
                disabled
                className="btn-submit"
              />
            )}
            {error && <Message msg={error} type="error" />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
