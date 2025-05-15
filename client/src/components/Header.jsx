import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Header = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
  
    const handleImageChange = async (e) => {
      const file = e.target.files[0];
      if (!file || !file.type.startsWith('image/')) {
        alert('Please upload a valid image file.');
        return;
      }
  
      const originalImage = URL.createObjectURL(file);
      const formData = new FormData();
      formData.append('image', file);
  
      setLoading(true);
  
      try {
        const response = await fetch('http://127.0.0.1:5173/remove-bg', {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error('Failed to process image');
        }
  
        const blob = await response.blob();
        const resultUrl = URL.createObjectURL(blob);
  
        navigate('/result', {
          state: {
            original: originalImage,
            result: resultUrl,
          },
        });
      } catch (error) {
        console.error("Error:", error);
        alert('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };
  
  return (
    <div className='flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20 '>
        {/* -------- Left Side */}
        <div >
            <h1 className='text-4xl xl:text-5xl 2xl:test-6xl font-bold text-neutral-700 leading-tight'>
                Remove the <br className='max-md:hidden'/> <span className='bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent'>background</span> from <br className='max-md:hidden'/> images for free.
            </h1>
            <p className='my-6 text-[15px] text-gray-500'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. <br className='max-sm:hidden'/>Lorem Ipsum has been the industry's standard dummy text ever.</p>
           <div>
                   <input type="file" id="upload2" hidden onChange={handleImageChange} />
                   <label
                     className='inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transition-all duration-700'
                     htmlFor="upload2"
                   >
                     <img width={20} src={assets.upload_btn_icon} alt="Upload Icon" />
                     <p className='text-white text-sm'>Upload your image</p>
                   </label>
                 </div>
                 {loading && (
             <div className="mt-10">
               <div className="border-t-4 mx-10 border-violet-600 text-center border-dashed rounded-full h-16 w-16 animate-spin"></div>
               <p className="text-gray-600 mt-4">Processing your image...</p>
             </div>
           )}
        </div>
        {/* -------- Right Side */}
        <div className='w-full max-w-md'>
            <img src={assets.header_img} alt="" />
        </div>
    </div>
  )
}

export default Header