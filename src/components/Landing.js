import React from 'react';
import { Link } from "react-router-dom";


export default function Landing() {
    return (
        <div className="bg-cover bg-center bg-small_landing h-screen flex items-end justify-center lg:bg-landing lg:items-center lg:justify-end lg:bg-left lg:py-[243px]">
            <div className="hidden lg:flex items-center justify-center text-white text-center mb-[57px] flex-col gap-8 lg:items-end lg:mb-0 lg:pr-[120px] lg:text-right lg:text-black">
                <p className="lg:block lg:text-customBlue lg:text-7xl lg:font-bold">ثمر</p>
                <div className='lg:text-xl'>
                    <p>حلول مبتكره لإدارة</p>
                    <p>صناديق العائلة بذكاء و كفاءة</p>
                </div>
                <Link to="" className="hidden lg:flex mb-3 text-center border w-[150px] h-[40px] justify-center items-center rounded-3xl border-customBlue text-customBlue hover:bg-customBlue hover:text-white">
                اعرف المزيد
            </Link>
            </div>
            <Link to="" className="lg:hidden mb-3 text-center border w-[150px] h-[40px] flex justify-center items-center rounded-3xl border-customBlue text-customBlue hover:bg-customBlue hover:text-white">
                اعرف المزيد
            </Link>
        </div>
    );
}

