import React, { useState } from 'react'

import logo from './react.svg'
import './App.css'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="Home">
      <div className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <h2>Welcome to Razzle</h2>
      </div>
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
    </div>
  )
}

export default App
