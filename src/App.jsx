import { useState, useCallback, useEffect,  useRef } from 'react' 

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopurstuvwxyz"
    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*(){}~"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass)
  },[length, numAllowed, charAllowed, setPassword]);


  const copyPasswordTo = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password)
  },[password])



  useEffect(()=>{
    passwordGenerator()
  }, [length, numAllowed,charAllowed, passwordGenerator])
  return (
    <>

    <div className = 'w-full h-32 space-y-2 max-w-md flex flex-col justify-center items-center  mx-auto shadow-md rounded-xl px-4 my-8 text-orange-500 bg-gray-800'>
      <div >
      <h1 className='-mt-4 text-white text-center my-2'>Password Generator</h1>
      </div>
      <div className = "flex shadow w-full rounded-xl  overlow-hidden mb-4">
          <input type="text" 
          value={password}
          className='rounded-xl outine-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}/>
          <button onClick={copyPasswordTo} 
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 rounded-xl'>Copy</button>

      </div>
      <div className='flex test-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={numAllowed}
          id='numberInput'
          onChange={()=>{
            setAllowed((prev)=>!prev)
          }} />
          <label >Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={charAllowed}
          id='numberInput'
          onChange={()=>{
            setAllowed((prev)=>!prev)
          }} />
          <label >Characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
