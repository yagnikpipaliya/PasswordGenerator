import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [bttnText, setBttnText] = useState("COPY");
  const [bttnRefresh, setBttnRefresh] = useState("");
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [specialchar, setSpecialchar] = useState(false);
  const [password, setPassword] = useState("");
  const passwordGenerator = useCallback(
    () => {
      let password = "";
      let str = "QAZWSXEDCRFVTGBYHNUJMIKOLPlkjhgfdsamnbpoivcxuytzrqwe";

      if (number) str += "1234567890";
      if (specialchar) str += `~!@#$₹%^&*()_+|{[}]";:',.>/<?`;

      for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random() * str.length + 1);
        password += str.charAt(char);
      }
      setPassword(password);
    },
    [length, number, specialchar, setPassword,bttnRefresh] // when dependencies change, useCallback render fnc
  );
  useEffect(() => {
    passwordGenerator();
    setBttnRefresh('')
  }, [length, number, specialchar,bttnRefresh]);

  const copyCode = () => {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        setBttnText("✔");
        setTimeout(function () {
          setBttnText("COPY");
        }, 2000);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <div className="flex h-screen items-center justify-around">
        <div className="w-[95%] max-w-sm m-auto rounded-lg px-2.5 py-4 bg-gray-600">
          <h1 className="text-center text-white font-semibold text-xl mb-4">Password Generator</h1>
          <div className="flex relative rounded-lg mb-4 overflow-hidden">
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Password"
              className="outline-none w-full h-full font-mono rounded-md py-2 px-3 text-black"
              value={password}
              readOnly
            />
            <button className="outline-none h-full absolute end-16 text-sm px-4 text-black" onClick={()=>{setBttnRefresh('Refresh')}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                <path
                  fill-rule="evenodd"
                  d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                />
              </svg>
            </button>
            <button
              className="w-16 outline-none h-full text-white absolute end-0  bg-blue-700 hover:bg-blue-800 font-medium rounded-e-lg text-sm px-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={copyCode}
            >
              {bttnText}
            </button>
          </div>
          <div className="flex text-sm gap-x-1.5">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                id="length"
                min={6}
                max={25}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label htmlFor="length">Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                id="number"
                defaultChecked={number}
                onChange={() => {
                  setNumber((prev) => !prev);
                }}
              />
              <label htmlFor="number">Number</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                id="symbol"
                defaultChecked={specialchar}
                onChange={() => {
                  setSpecialchar((prev) => !prev);
                }}
              />
              <label htmlFor="symbol">Symbol</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
