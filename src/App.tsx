import { useState } from 'react'

function App() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  // Seeded random number generator using timestamp
  const generateRandomNumber = (): number => {
    const seed = Date.now()
    // Simple linear congruential generator seeded with timestamp
    const x = Math.sin(seed) * 10000
    const random = x - Math.floor(x)
    const randomInt = Math.floor(random * 1000000)

    // Return a random number between -999999 and 999999
    return randomInt - 500000
  }

  const handleNumberClick = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num)
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.')
      setWaitingForNewValue(false)
    } else if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const handleOperation = (op: string) => {
    const currentValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(currentValue)
    } else if (operation) {
      // This would be where normal calculation happens,
      // but we ignore it and show random number instead
      const randomResult = generateRandomNumber()
      setDisplay(randomResult.toString())
      setPreviousValue(randomResult)
    }

    setOperation(op)
    setWaitingForNewValue(true)
  }

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      // Generate random number regardless of the operation
      const randomResult = generateRandomNumber()
      setDisplay(randomResult.toString())
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(true)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
  }

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay('0')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <h1 className="text-center text-2xl font-bold mb-6 text-gray-800">Calculator</h1>

        {/* Display */}
        <div className="bg-gray-900 text-white text-right p-4 rounded-lg mb-6 overflow-hidden">
          <div className="text-4xl font-mono break-words">{display}</div>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-2">
          {/* Row 1: Clear */}
          <button
            onClick={handleClear}
            className="col-span-2 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded text-lg transition"
          >
            C
          </button>
          <button
            onClick={handleBackspace}
            className="col-span-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded text-lg transition"
          >
            ←
          </button>

          {/* Row 2: Numbers 7-9, Division */}
          <button
            onClick={() => handleNumberClick('7')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded text-lg transition"
          >
            7
          </button>
          <button
            onClick={() => handleNumberClick('8')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded text-lg transition"
          >
            8
          </button>
          <button
            onClick={() => handleNumberClick('9')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded text-lg transition"
          >
            9
          </button>
          <button
            onClick={() => handleOperation('÷')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded text-lg transition"
          >
            ÷
          </button>

          {/* Row 3: Numbers 4-6, Multiplication */}
          <button
            onClick={() => handleNumberClick('4')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded text-lg transition"
          >
            4
          </button>
          <button
            onClick={() => handleNumberClick('5')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded text-lg transition"
          >
            5
          </button>
          <button
            onClick={() => handleNumberClick('6')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded text-lg transition"
          >
            6
          </button>
          <button
            onClick={() => handleOperation('×')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded text-lg transition"
          >
            ×
          </button>

          {/* Row 4: Numbers 1-3, Subtraction */}
          <button
            onClick={() => handleNumberClick('1')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded text-lg transition"
          >
            1
          </button>
          <button
            onClick={() => handleNumberClick('2')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded text-lg transition"
          >
            2
          </button>
          <button
            onClick={() => handleNumberClick('3')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded text-lg transition"
          >
            3
          </button>
          <button
            onClick={() => handleOperation('-')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded text-lg transition"
          >
            −
          </button>

          {/* Row 5: Number 0, Decimal, Addition */}
          <button
            onClick={() => handleNumberClick('0')}
            className="col-span-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded text-lg transition"
          >
            0
          </button>
          <button
            onClick={handleDecimal}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded text-lg transition"
          >
            .
          </button>
          <button
            onClick={() => handleOperation('+')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded text-lg transition"
          >
            +
          </button>

          {/* Row 6: Equals */}
          <button
            onClick={handleEquals}
            className="col-span-4 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded text-lg transition"
          >
            =
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
