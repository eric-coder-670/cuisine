import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Pages from './pages/Pages'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <Pages/>
    </>
  )
}

export default App
