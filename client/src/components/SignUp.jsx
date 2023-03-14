// import Close from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { useCreateUsersMutation } from "../features/api/apiSlice";

const SignUp = ({ signUp, login }) => {
  const [userData, userResponse] = useCreateUsersMutation();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [isError, setIsError] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userResponse.status === "pending") {
      setIsError(false);
      setLoading(true);
    } else if (userResponse.status === "rejected") {
      setErrorMessage(userResponse?.error.data);
      setLoading(false);
      setIsError(true);
    } else if (userResponse.status === "fulfilled") {
      setLoading(false);
      setIsError(false);
      signUp(false);
      login(true);
      setEmail(" ");
      setPassword(" ");
      setConfirmPassword(" ");
    }
  }, [userResponse]);

  const createUser = () => {
    userData({ email, password, confirmPassword });
    setLoading(true);
  };

  return (
    <div className="flex rounded-lg text-gray-200 bg-gray-500k flex-col w-[35%] h-[50%] items-center justify-center">
      <p className="text-sm sm:text-sm md:text-xl lg:text-2xl font-extrabold text-gray-400">
        CREATE ACCOUNT
      </p>
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        className="text-sm bg-transparent w-[60%] px-2 mt-5 h-10 focus:outline-none border border-[#00aeff]"
        placeholder="email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className="text-sm bg-transparent w-[60%] px-2 mt-2 h-10 focus:outline-none border border-[#00aeff]"
        placeholder="password"
      />
      <input
        onChange={(e) => setConfirmPassword(e.target.value)}
        type="password"
        className="text-sm bg-transparent w-[60%] px-2 mt-2 h-10 focus:outline-none border border-[#00aeff]"
        placeholder="confirm password"
      />
      <button
        onClick={createUser}
        className="text-lg font-bold text-gray-400 px-2 h-10 py-1 w-[60%] bg-transparent mt-4 border border-[#00aeff] hover:text-gray-100"
      >
        Sign up
      </button>
      <p
        onClick={() => {
          signUp(false);
          login(true);
        }}
        className="absolute text-xs cursor-pointer top-2 left-3 text-gray-400 hover:text-gray-100"
      >
        back
      </p>
      {isError && (
        <div className="w-[80vh] flex flex-col items-center justify-center mt-4 absolute bottom-8  text-white">
          {errorMessage.map((e) => {
            return <p className="text-sm">- {e.msg}</p>;
          })}
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

export default SignUp;
