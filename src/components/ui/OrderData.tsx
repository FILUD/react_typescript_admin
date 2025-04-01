import React from 'react'

function NullData() {
    const userData = {
        bronze: 100,
        silver: 203,
        gold: 560,
        diamond: 645
    }

    return (
        <main className='bg-white p-5 rounded-lg h-[330px]'>
            <li className='text-[24px] font-semibold flex gap-5 items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                </svg>

                Order Data</li>
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


export default NullData