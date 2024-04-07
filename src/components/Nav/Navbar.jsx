import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-500 flex justify-between align-middle px-5' >
            <div className="flex p-3 logo font-bold">To-Do</div>
            {/* <ul className='flex gap-5  p-3 text-xl text transition-all'>
                <li className='hover:font-bold'>Home</li>
                <li className='hover:font-bold'>About</li>
                <li className='hover:font-bold'>Carrer</li>
            </ul> */}
        </nav>
    )
}

export default Navbar