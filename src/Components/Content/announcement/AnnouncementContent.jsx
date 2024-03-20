import React from 'react'

const AnnouncementContent = ({title, body}) => {

  return (
    <div className='h-full w-full bg-gradient-to-b from-[#630462] from-25% via-[#883458] rounded-md flex justify-center items-center flex-col via-50% to-[#EFC340] to-98% p-10 sm:px-5 pt-20'>
        <div className="bg-[#630462] w-fit h-fit px-3 mb-[-40px] mt-[-70px] z-10">
            <img src="\logo.png" alt="rci logo" className="opacity-90 w-16 h-[90px]" />                
        </div>
        <div className="border-4 border-[#ECC134] h-full w-full rounded-md flex justify-center  flex-col p-8 sm:px-4 pt-9">
        <p className="text-center text-2xl sm:text-xl p-1 font-semibold text-[#ECC134]">SENIOR HIGH DEPARTMENT</p>
            <div className="w-full h-full bg-white rounded-md flex justify-center items-start flex-col">
                <div className="pt-8 w-full">
                    <h1 className="text-4xl sm:text-[16px] text-center font-bold">ANNOUNCEMENT</h1>
                    <p className="text-center sm:text-[12px] tracking-widest sm:tracking-[0.0018em] font-semibold mt-[-5px]">FROM THE OFFICE OF THE PRESIDENT</p>                    
                </div>
                <div className="h-full w-full text-justify-between text-center flex justify-center flex-col items-center p-10 sm:p-2">
                    <h1 className="font-bold text-2xl sm:text-[16px] pb-2 text-[#630462]">{title}</h1>
                    <p className="sm:text-[12px] font-semibold">{body}</p>
                </div>
            </div>                
        </div>
    </div>
  )
}

export default AnnouncementContent