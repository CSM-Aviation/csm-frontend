import React from 'react'

const Button = () => {
  return (
    <div>
      <button className="flex items-center px-8 py-4 mt-10 bg-electric-blue border border-gray-500 rounded-xl shadow-sm hover:bg-red-600 group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
          <span className="font-medium text-black mr-2 group-hover:text-white">FILTER</span>
          <div className='flex flex-col'>
            <div className="flex  items-center">
              <div className="w-4 h-0.5 bg-black group-hover:bg-white"></div>
              <div className='w-3 h-3 border-2 group-hover:border-white border-black rounded-full bg-transparent '></div>
              <div className="w-6 h-0.5 bg-black group-hover:bg-white"></div>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-0.5 bg-black group-hover:bg-white"></div>
              <div className='w-3 h-3 border-2 group-hover:border-white border-black rounded-full bg-transparent '></div>
              <div className="w-4 h-0.5 bg-black group-hover:bg-white"></div>
            </div>
          </div>
        </button>
    </div>
  )
}

export default Button