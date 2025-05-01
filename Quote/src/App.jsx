import React from 'react'
import { useState } from 'react'
import { Quote } from 'lucide-react'

export default function App() {
  const [quote, setQuote] = useState('')
  const [author, setAuthor] = useState('')
  const [loading, setLoading] = useState(false)
  
  const fetchQuote = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://dummyjson.com/quotes/random')
      const data = await response.json()
      console.log(data);
      
      setQuote(data.quote)
      setAuthor(data.author)
    } catch (error) {
      console.error('Error fetching quote:', error)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="w-full h-full">
      <div className="min-h-screen  bg-gradient-to-br from-white-700 to-white-900 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-full mx-auto">
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-2xl font-bold text-indigo-800 mr-2">Daily Inspiration</h1>
            <Quote size={24} className="text-indigo-600" />
          </div>
          
          <div className="bg-indigo-50 rounded-lg p-6 mb-6 min-h-40 flex flex-col justify-center">
            {quote ? (
              <>
                <p className="text-gray-700 text-lg mb-4 italic">"{quote}"</p>
                {author &&
                <p className="text-center text-indigo-600 font-medium">— {author}</p>}
              </>
            ) : (
              <p className="text-gray-500 text-center">Click the button below to get inspired</p>
            )}
          </div>
          
          <button
            onClick={fetchQuote}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
            ) : null}
            {loading ? "Getting Quote..." : "Get Inspirational Quote"}
          </button>
        </div>
      </div>
    </div>
  )
}