import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const passwordRef = useRef();

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "!@#$%^&*()-=+_<>?/:';{}[]";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();

    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [length, charAllowed, numberAllowed, generatePassword]);

  return (
    <div className="my-4 w-full  p-1 sm:p-6  max-w-72 sm:max-w-md shadow-md mx-auto rounded-lg bg-slate-600 text-orange-500 ">
      <h1 className="text-xl text-center text-white">Password Generator</h1>

      <div className="flex my-3 overflow-hidden shadow rounded-md">
        <input
          type="text"
          className="px-3 outline-none py-1 border-none w-full"
          value={password}
          ref={passwordRef}
          placeholder="Password ...."
          readOnly
        />
        <button
          onClick={copyToClipboard}
          className="shrink-0 bg-blue-700 px-7 text-white   outline-none border-nonemr-2 "
        >
          Copy
        </button>
      </div>

      <div className="flex flex-col sm:flex-row text-sm gap-x-2">
        <div className="flex  items-center gap-x-1 ">
          <input
            type="range"
            value={length}
            min={3}
            max={255}
            onChange={(e) => setLength(e.target.value)}
            className="cursor-pointer"
          />
          <label>Length : {length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            id="numberInputAllowed"
            value={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="numberInputAllowed">Number</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            value={charAllowed}
            id="characterInput"
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
