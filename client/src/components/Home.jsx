import React, { useState } from "react";
import "./../style.css";
import Login from "./Login";
import SignUp from "./SignUp";
import Translator from "./Translator";

const Home = ({ keys, values }) => {
  const [login, setLogin] = useState(true);
  const [signUp, setSignUp] = useState(false);
  const [translator, setTranslator] = useState(false);
  const [token, setToken] = useState();

  return (
    <div className="w-[100%] flex flex-col h-[100vh] text-white items-center justify-center">
      {login && (
        <Login
          translator={setTranslator}
          token={setToken}
          signUp={setSignUp}
          login={setLogin}
        />
      )}
      {signUp && <SignUp signUp={setSignUp} login={setLogin} />}
      {translator && token && (
        <Translator
          keys={keys}
          values={values}
          translator={setTranslator}
          login={setLogin}
          token={token}
        />
      )}
    </div>
  );
};

export default Home;
