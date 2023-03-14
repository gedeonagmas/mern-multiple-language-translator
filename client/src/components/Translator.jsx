import React, { useEffect, useState } from "react";
import { format } from "timeago.js";
import {
  useGetHistoryQuery,
  useTranslateMutation,
} from "../features/api/apiSlice";

const Translator = ({ keys, values, translator, login, token }) => {
  const [translateData, translateResponse] = useTranslateMutation();
  const { data: historyData } = useGetHistoryQuery({ token: token });

  const [inputLanguage, setInputLanguage] = useState("am");
  const [outputLanguage, setOutputLanguage] = useState("en");
  const [textToTranslate, setTextToTranslate] = useState("ምግብ");
  const [translatedText, setTranslatedText] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState();
  const [searchText, setSearchText] = useState("");
  const [historyDatas, setHistoryDatas] = useState();

  useEffect(() => {
    if (historyData) {
      setHistory(historyData);
    }
  }, [historyData]);

  useEffect(() => {
    if (translateResponse.status === "pending") {
      setIsError(false);
      setLoading(true);
    } else if (translateResponse.status === "rejected") {
      setLoading(false);
      setIsError(true);
      setErrorMessage(translateResponse.error.data.message);
    } else if (translateResponse.status === "fulfilled") {
      setTranslatedText(translateResponse.data.text.translations);
      setHistory(translateResponse.data.history);
      setHistoryDatas(translateResponse.data.history);
      setLoading(false);
      setIsError(false);
    }
  }, [translateResponse]);

  const translateHandler = async () => {
    translateData({
      text: textToTranslate,
      target: outputLanguage,
      source: inputLanguage,
      token: token,
      keys: keys,
      values: values,
    });
    setLoading(true);
  };

  useEffect(() => {
    if (searchText.length > 0 && history?.length > 0) {
      setHistoryDatas(
        history.filter((his) =>
          his.text
            .toString()
            .toLowerCase()
            .startsWith(searchText.toString().toLowerCase())
        )
      );
    } else {
      setHistoryDatas(history);
    }
  }, [searchText, history]);
  return (
    <div className="flex flex-col w-[100%] text-gray-300 h-[100vh] items-center justify-center py-4">
      <p className="text-3xl mt-2 font-extrabold">Translation Dashboard</p>
      <div className="flex relative w-[100%] h-[100vh]">
        <div className="flex flex-[60%] h-[80vh] items-center justify-center">
          <div className="flex items-center justify-center w-[100%] flex-col">
            <p className="text-lg font-bold mt-5">FROM</p>
            <div className="flex items-center w-[100%] justify-center ">
              <select
                onChange={(e) => setInputLanguage(e.target.value)}
                className="text-sm bg-gray-700 bg-transparent rounded-sm w-[90%] px-2 mt-5 h-10 focus:outline-none border border-[#00aeff]"
                name="lang"
                id=""
              >
                {keys.map((k, i) => {
                  return (
                    <option value={values[i]} className="bg-gray-600">
                      {k}
                    </option>
                  );
                })}
              </select>
            </div>
            <textarea
              onChange={(e) => setTextToTranslate(e.target.value)}
              name="translating"
              id=""
              cols="30"
              rows="10"
              className="w-[90%] mt-2 bg-gray-700 rounded-sm bg-transparent border border-[#00aeff] focus:outline-none px-2 py-1"
              placeholder="input text"
            ></textarea>
          </div>
          <div className="flex items-center justify-center w-[100%] flex-col">
            <p className="text-lg font-bold mt-5">TO</p>
            <div className="flex items-center w-[100%] justify-center ">
              <select
                onChange={(e) => setOutputLanguage(e.target.value)}
                className="text-sm bg-gray-700 bg-transparent rounded-sm w-[90%] px-2 mt-5 h-10 focus:outline-none border border-[#00aeff]"
                name="lang"
                id=""
              >
                {keys.map((k, i) => {
                  return (
                    <option value={values[i]} className="bg-gray-600">
                      {k}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex h-[250px] w-[90%] overflow-y-scroll mt-2 flex-col bg-transparent bg-gray-700 py-1 border border-[#00aeff] px-2 ">
              {translatedText && (
                <div className="flex flex-col w-[100%] h-auto text-gray-300">
                  <p className="text-lg font-bold">
                    input text :{" "}
                    <span className="text-sm ml-1">{translatedText.text}</span>
                  </p>
                  <p className="text-lg font-bold">
                    translated text :{" "}
                    <span className="text-sm ml-1">
                      {translatedText.translation}
                    </span>{" "}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={translateHandler}
          className="text-lg absolute bottom-8 left-5 font-bold rounded-sm hover:text-white px-2 h-10 py-1 w-[20%] mt-4 border border-[#00aeff]"
        >
          Translate
        </button>

        <div className="flex flex-col items-center flex-[40%]">
          <p className="text-lg font-bold">Translation History</p>
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            className="w-[87%] h-10 border bg-gray-700 bg-transparent mt-6 border-[#00aeff] focus:outline-none px-2 py-1 "
            placeholder="search history"
          />
          <div className="mt-2 w-[87%] h-[75vh] overflow-y-scroll">
            {historyDatas &&
              historyDatas.map((his) => {
                return (
                  <div className="h-auto px-2 mt-2 py-1 rounded-sm w-[100%] border border-gray-300">
                    <p className="text-xs text-gray-300">
                      date :{" "}
                      <span className=" text-gray-100">{format(his.date)}</span>{" "}
                    </p>
                    <p className="text-xs text-gray-300">
                      from : <span className=" text-gray-100">{his.from}</span>{" "}
                      to : <span className=" text-gray-100">{his.to}</span>
                    </p>
                    <p className="text-xs text-gray-300">
                      input text :{" "}
                      <span className=" text-gray-100">{his.text}</span>{" "}
                    </p>
                    <p className="text-xs text-gray-300">
                      translated text :{" "}
                      <span className=" text-gray-100">{his.translation}</span>{" "}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <p
        className="absolute cursor-pointer text-xs top-2 left-3"
        onClick={() => {
          translator(false);
          login(true);
        }}
      >
        logout
      </p>
      {isError && (
        <div className="w-[50%] flex flex-col items-center justify-center mt-4 absolute bottom-4  text-white">
          <p className="text-sm font-bold text-gray-400 border border-gray-400 py-1 px-2">
            {errorMessage}
          </p>
          ;
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

export default Translator;
