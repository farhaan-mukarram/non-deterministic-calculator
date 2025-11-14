import { useState } from 'react'

function App() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  // Calculate the actual result
  const calculateActualResult = (a: number, op: string, b: number): number => {
    switch (op) {
      case '+':
        return a + b
      case '-':
        return a - b
      case '×':
        return a * b
      case '÷':
        return b !== 0 ? a / b : 0
      default:
        return 0
    }
  }

  // Generate a "slightly wrong" result with random noise
  const generateWrongNumber = (actualResult: number): number => {
    const seed = Date.now()
    const random = Math.sin(seed) * 10000 - Math.floor(Math.sin(seed) * 10000)

    // Add noise to the actual result
    const noiseStrategies = [
      () => actualResult + (random - 0.5) * 2, // ±1 noise
      () => actualResult * (0.95 + random * 0.1), // ±5% multiplier
      () => actualResult + (random > 0.5 ? 0.7 : -0.3), // Odd decimals
      () => actualResult - random * 1.5, // Subtract some noise
      () => actualResult + Math.sin(seed) * 0.5, // Trigonometric noise
      () => actualResult * (1 + (random - 0.5) * 0.2), // ±10% multiplier
    ]

    const strategy = Math.floor(random * noiseStrategies.length)
    const noisyResult = noiseStrategies[strategy]()

    // Return with a random number of decimal places (1-8)
    const decimalPlaces = Math.floor(random * 8) + 1
    return parseFloat(noisyResult.toFixed(decimalPlaces))
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
      // Calculate and show slightly wrong result
      const actualResult = calculateActualResult(previousValue, operation, currentValue)
      const wrongResult = generateWrongNumber(actualResult)

      setDisplay(wrongResult.toString())
      setPreviousValue(wrongResult)
    }

    setOperation(op)
    setWaitingForNewValue(true)
  }

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const currentValue = parseFloat(display)
      const actualResult = calculateActualResult(previousValue, operation, currentValue)
      const wrongResult = generateWrongNumber(actualResult)

      setDisplay(wrongResult.toString())
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
