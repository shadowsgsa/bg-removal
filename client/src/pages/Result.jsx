import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const originalImage = state?.original;
  const resultImage = state?.result;

  if (!originalImage || !resultImage) {
    // Redirect if state is missing (e.g. direct access to /result)
    navigate('/');
    return null;
  }

  return (
    <div className='mx-4 my-3 lg:mx-44 mt-14 min-h-[75vh]'>

      <div className='bg-white rounded-lg px-8 py-6 drop-shadow-sm '>
        <div className='flex flex-col sm:grid grid-cols-2 gap-8'>
          <div>
            <p className='font-semibold text-gray-600 mb-2'>Original</p>
            <img className='rounded-md border' src={originalImage} alt="Original" />
          </div>

          <div className='flex flex-col'>
            <p className='font-semibold text-gray-600 mb-2'>Background Removed</p>
            <div className='rounded-md border border-gray-300 h-full relative bg-layer overflow-hidden'>
              <img src={resultImage} alt="Processed" />
            </div>
          </div>
        </div>

        <div className='flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-6'>
          <button
            className='px-8 py-2.5 text-violet-600 text-sm border border-violet-600 rounded-full hover:scale-105 transition-all duration-700'
            onClick={() => navigate('/')}
          >
            Try Another image
          </button>
          <a
            className='px-8 py-2.5 text-white text-sm bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full hover:scale-105 transition-all duration-700'
            href={resultImage}
            download="removed-bg.png"
          >
            Download image
          </a>
        </div>
      </div>

    </div>
  );
}

export default Result;
