import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../features/api/apiSlice";

const Login = ({ translator, login, signUp, token }) => {
  const [loginData, loginResponse] = useLoginMutation();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loginResponse.status === "pending") {
      setIsError(false);
      setLoading(true);
    } else if (loginResponse.status === "rejected") {
      setErrorMessage(loginResponse?.error.data.message);
      setLoading(false);
      setIsError(true);
    } else if (loginResponse.status === "fulfilled") {
      token(loginResponse.data.token);
      setLoading(false);
      setIsError(false);
      translator(true);
      login(false);
      setEmail(" ");
      setPassword(" ");
    }
  }, [loginResponse]);

  const loginHandler = () => {
    setLoading(true);
    loginData({ email, password, food: "bread" });
  };

  return (
    <div className="flex rounded-lg text-gray-100 bg-opacity-70  bg-gray-500k flex-col w-[35%] h-[50%] items-center justify-center">
      <p className="text-2xl text-gray-400 font-extrabold">LOG IN</p>
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        className="text-sm bg-transparent border border-[#00aeff] autofill:text-white w-[60%] px-2 mt-5 h-10 focus:outline-none"
        placeholder="email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className="text-sm w-[60%] autofill:bg-none bg-transparent  px-2 mt-2 h-10 focus:outline-none border border-[#00aeff]"
        placeholder="password"
      />
      <button
        onClick={loginHandler}
        className="text-lg font-bold bg-transparent text-gray-400 px-2 h-10 py-1 w-[60%] mt-4 border border-[#00aeff] hover:text-gray-100 duration-150"
      >
        Log in
      </button>
      <p className="text-xs md:text-sm font-bold mt-2 text-gray-400">
        don't you have an account?{" "}
        <span
          onClick={() => {
            login(false);
            signUp(true);
          }}
          className="text-gray-300 hover:text-white px-1 py-1 ml-2 cursor-pointer"
        >
          create new
        </span>
      </p>
      {isError && (
        <div className="w-[80vh] flex flex-col items-center justify-center mt-4 absolute bottom-8  text-white">
          <p className="text-sm">- {errorMessage}</p>;
        </div>
      )}
      {loading && (
        <div className="w-[80vh] flex flex-col items-center justify-center mt-4 absolute bottom-8  text-white">
          <img
            src="./img/load2.gif"
            alt="Loading..."
            className="w-20 bg-transparent h-20 rounded-full"
          />
        </div>
      )}
    </div>
  );
};

export default Login;
