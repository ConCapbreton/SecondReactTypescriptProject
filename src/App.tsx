import { useState, useEffect, useCallback, useMemo, useRef, MouseEvent, KeyboardEvent } from 'react'

interface User {
  id: number,
  username: string,
}


function App() {
  const [count, setCount] = useState<number>(0)
  const [users, setUsers] = useState<User[] | null>(null)

useEffect(() => {
  console.log('mounting') // when you use strictmode (in development mode) the component is mounted, demounted and the mounted again. So console log should appear twice. 
  console.log('Users: ', users)

  return () => console.log('unmounting') // the return statement is only mounted once so this will only be logged to the console once. 
}, [users])
// no real typescript application for useEffect that is not returning a value
// useEffect is a for side-effects (eg users state change and then something is logged to a console (console.log is also a sideeffect) because of this there is no real typescript application for useEffect, particularly if it is not returning a value.

const addTwo = useCallback((e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>): void => setCount(prev => prev + 2),[])
// useCallback prevents having to retype functions. It also has a dependency array that works like useEffect, when a change in dependency calls the function (in this case we have left it blank as it is called on the click of a button).
// no real typescript requirements but you can classify if you want (added in "e" in the callback as an example above even though it is not required) 

type fibFunc = (n: number) => number
const fib: fibFunc = (n) => {
  if (n < 2) return n
  return fib(n - 1) + fib(n - 2)
}
// useMemo holds a value. Can be useful if a function takes a while to calculate and you dont want to have to run it more than necesary. You can store the value in useMemo
// fibonacci sequaence (calculated in above function is an "expensive" function)

const myNum: number = 37
const result = useMemo<number>(() => fib(myNum),[myNum])
// the result is stored in Memo and is only re-calculated if myNum changes

const inputRef = useRef<HTMLInputElement>(null)
// either the ref is used as HTML element by leveraging the ref attribute on an element or as instance variable to keep track of a state which does not cause React to re-render.
// in this project ref is only logged to the console when the state is changed (eg clicking the Add 2 button)
console.log(inputRef?.current)
console.log(inputRef?.current?.value)

  return (
    <div className="App">
        <h1>{count}</h1>
        <button onClick={addTwo}>Add Two</button>
        <h2>{result}</h2>
        <input ref={inputRef} type="text"></input>
    </div>
  )
}

export default App
