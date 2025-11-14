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
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-900 rounded-3xl p-6 w-96 shadow-2xl">
        {/* Display */}
        <div className="bg-black text-white text-right p-8 rounded-2xl mb-8 overflow-hidden">
          <div className="text-6xl font-light tracking-tight break-words">{display}</div>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1: Clear & Backspace */}
          <button
            onClick={handleClear}
            className="col-span-2 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white font-semibold py-4 px-6 rounded-full text-xl transition duration-75"
          >
            AC
          </button>
          <button
            onClick={handleBackspace}
            className="col-span-2 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white font-semibold py-4 px-6 rounded-full text-xl transition duration-75"
          >
            ⌫
          </button>

          {/* Row 2: Numbers 7-9, Division */}
          <button
            onClick={() => handleNumberClick('7')}
            className="bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white font-semibold py-4 px-6 rounded-full text-2xl transition duration-75"
          >
            7
          </button>
          <button
            onClick={() => handleNumberClick('8')}
            className="bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white font-semibold py-4 px-6 rounded-full text-2xl transition duration-75"
          >
            8
          </button>
          <button
            onClick={() => handleNumberClick('9')}
            className="bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white font-semibold py-4 px-6 rounded-full text-2xl transition duration-75"
          >
            9
          </button>
          <button
            onClick={() => handleOperation('÷')}
            className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold py-4 px-6 rounded-full text-2xl transition duration-75"
          >
            ÷
          </button>

          {/* Row 3: Numbers 4-6, Multiplication */}
          <button
            onClick={() => handleNumberClick('4')}
            className="bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white font-semibold py-4 px-6 rounded-full text-2xl transition duration-75"
          >
            4
          </button>
          <button
            onClick={() => handleNumberClick('5')}
            className="bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white font-semibold py-4 px-6 rounded-full text-2xl transition duration-75"
          >
            5
          </button>
          <button
            onClick={() => handleNumberClick('6')}
            className="bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white font-semibold py-4 px-6 rounded-full text-2xl transition duration-75"
          >
            6
          </button>
          <button
            onClick={() => handleOperation('×')}
            className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold py-4 px-6 rounded-full text-2xl transition duration-75"
          >
            ×
          </button>

          {/* Row 4: Numbers 1-3, Subtraction */}
          <button
            onClick={() => handleNumberClick('1')}
            className="bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white font-semibold py-4 px-6 rounded-full text-2xl transition duration-75"
          >
            1
          </button>
          <button
            onClick={() => handleNumberClick('2')}
            className="bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white font-semibold py-4 px-6 rounded-full text-2xl transition duration-75"
          >
            2
          </button>
          <button
            onClick={() => handleNumberClick('3')}
            className="bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white font-semibold py-4 px-6 rounded-full text-2xl transition duration-75"
          >
            3
          </button>
          <button
            onClick={() => handleOperation('-')}
            className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold py-4 px-6 rounded-full text-2xl transition duration-75"
          >
            −
          </button>

          {/* Row 5: Number 0, Decimal, Addition */}
          <button
            onClick={() => handleNumberClick('0')}
            className="col-span-2 bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white font-semibold py-4 px-6 rounded-full text-2xl transition duration-75"
          >
            0
          </button>
          <button
            onClick={handleDecimal}
            className="bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white font-semibold py-4 px-6 rounded-full text-2xl transition duration-75"
          >
            .
          </button>
          <button
            onClick={() => handleOperation('+')}
            className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold py-4 px-6 rounded-full text-2xl transition duration-75"
          >
            +
          </button>

          {/* Row 6: Equals */}
          <button
            onClick={handleEquals}
            className="col-span-4 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold py-4 px-6 rounded-full text-2xl transition duration-75"
          >
            =
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
