import React from 'react'

function CoffeeData() {
    const userData = {
        bronze: 100,
        silver: 203,
        gold: 560,
        diamond: 645
    }

    return (
        <main className='bg-white p-5 rounded-lg h-[330px]'>
            <li className='text-[24px] font-semibold flex gap-5 items-center'>
                <img className='size-10' src="/icons/coffee/icons8-coffee-100.png" alt="" />
                Product Data</li>
            <hr />
            <div className='flex flex-col gap-5 py-5 overflow-y-auto h-[200px]'>
                <span className='flex justify-between'>
                    <li>Coffee</li>
                    <p className='flex gap-3'>{userData.bronze}
                        <p>items</p>
                    </p>
                </span>
                <span className='flex justify-between'>
                    <li>Bakery</li>
                    <p className='flex gap-3'>{userData.silver}
                        <p>items</p>
                    </p>
                </span>
                <span className='flex justify-between'>
                    <li>Gold</li>
                    <p className='flex gap-3'>{userData.gold}
                        <p>items</p>
                    </p>
                </span>
                <span className='flex justify-between'>
                    <li>Diamond</li>
                    <p className='flex gap-3'>{userData.diamond}
                        <p>items</p>
                    </p>
                </span>
                <span className='flex justify-between'>
                    <li>Gold</li>
                    <p className='flex gap-3'>{userData.gold}
                        <p>items</p>
                    </p>
                </span>
                <span className='flex justify-between'>
                    <li>Diamond</li>
                    <p className='flex gap-3'>{userData.diamond}
                        <p>items</p>
                    </p>
                </span>
                <span className='flex justify-between'>
                    <li>Gold</li>
                    <p className='flex gap-3'>{userData.gold}
                        <p>items</p>
                    </p>
                </span>
                <span className='flex justify-between'>
                    <li>Diamond</li>
                    <p className='flex gap-3'>{userData.diamond}
                        <p>items</p>
                    </p>
                </span>
            </div>
            <hr />
            <span className='flex gap-3 items-center hover:bg-slate-300 duration-300 py-1 font-semibold mt-5 justify-center cursor-pointer  rounded-xl '>
                View all
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                </svg>
            </span>
        </main>
    )
}


export default CoffeeData