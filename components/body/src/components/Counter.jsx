import React, { useEffect, useState, useRef } from 'react'

const Counter = () => {
  const [count, setCount] = useState(0)
  const countRef = useRef(count)
  countRef.current = count

  useEffect(() => {
    setTimeout(() => {
      setCount(countRef.current + 1)
    }, 1000)
  }, [])

  return (
    <div>
      Count: {count || 'Initial'}
    </div>
  )
}

export default Counter
