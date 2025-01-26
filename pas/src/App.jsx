import { useState,useCallback,useEffect,useRef} from 'react'
import './App.css'

function App() {
  const [length,setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const [password,setPassword] = useState("")

  // ref hook useRef()

  const passwordRef = useRef(null) // for copy feature

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str=str+"012356789"
    if(charAllowed) str=str+"!@#$%^&*()_-+=<>?/[]{}|"


    for (let i = 1; i <= length; i++) {
     let char = Math.floor(Math.random()* str.length + 1)
     pass += str.charAt(char)
      
    }
   
   setPassword(pass)

  },[length,numberAllowed,charAllowed,setPassword]) 

  const copyPasswordToClipboard = useCallback(()=>{
  passwordRef.current?.select();
  window.navigator.clipboard.writeText(password)
  .then(() => {
    alert("Password copied to clipboard successfully!");
  })
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

    

  return (
    <div className="app-container">
      <h1>Password Generator</h1>
      <div className="settings">
        {/* Slider for password length */}
        <div className="settings-row">
          <label>Password Length: {length}</label>
          <input
            type="range"
            min="1"
            max="99"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>

        {/* Checkboxes for including numbers and special characters */}
        <div className="checkboxes">
          <label>
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed(!numberAllowed)}
            />
            Include Numbers
          </label>

          <label>
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed(!charAllowed)}
            />
            Include Special Characters
          </label>
        </div>
      </div>

      {/* Password Display Section */}
      <div className="password-display">
        <div className="password-box">
          <input
            type="text"
            className="password-input"
            value={password}
            readOnly
            placeholder="password "
          />
          <button className="copy-button" onClick={copyPasswordToClipboard}>
          Copy
         </button>
        </div>
      </div>
    </div>
  );
}

export default App;