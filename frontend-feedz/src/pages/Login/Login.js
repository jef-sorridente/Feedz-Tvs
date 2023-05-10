import "./Auth.css";

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message/Message";
import { VscDebugRestart } from "react-icons/vsc";

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

  //Botão para Modificar de Login p/ Cadastro
  const [myClass, setMyClass] = useState("btn-login");

  function alternateClass() {
    if (myClass === "btn-login") {
      setMyClass("btn-cadastro");
    } else {
      setMyClass("btn-login");
    }
  }

  useEffect(() => {
    const elemento = document.querySelector(".container-login-box");
    elemento.classList.remove("btn-login");
    elemento.classList.remove("btn-cadastro");
    elemento.classList.add(myClass);
  }, [myClass]);

  return (
    <div className="container-login">
      <div className="container-login-box">
        {myClass === "btn-login" ? (
          <>
            <div className="information">
              <h2 className="information-title">Feedz de Noticias</h2>
              <p>Bem vindo ao Feedz / Tvs</p>
            </div>
            <div className="login">
              <div>
                <h2 className="login-tilte">Faça login para continuar!</h2>
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
                    <input
                      type="submit"
                      value="Entrar"
                      className="btn-submit"
                    />
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
          </>
        ) : (
          <>
            <div className="information">
              <h2 className="information-title-secundary">
                Realize o seu cadastro para continuar!
              </h2>
              <form>
                <input
                  type="text"
                  placeholder="Insira seu nome"
                  className="input-text-register"
                />
                <input
                  type="text"
                  placeholder="E-mail"
                  className="input-text-register"
                />
                <input
                  type="password"
                  placeholder="Senha"
                  className="input-text-register"
                />
                <input
                  type="password"
                  placeholder="Conferir a senha"
                  className="input-text-register"
                />
                <input
                  type="submit"
                  value="Cadastrar"
                  className="btn-submit-secundary"
                />
              </form>
            </div>
            <div className="login">
              <div>
                <h2 className="login-title-secundary">
                  Faça cadastro para continuar!
                </h2>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Maxime unde consequuntur, et reiciendis veritatis in quibusdam
                  dolore a repudiandae, corporis molestiae. Tempore dolore
                  assumenda eius tenetur.
                </p>
              </div>
            </div>
          </>
        )}
        <button onClick={alternateClass} className="btn-alternate-login">
          <VscDebugRestart />
        </button>
      </div>
    </div>
  );
};

export default Login;
