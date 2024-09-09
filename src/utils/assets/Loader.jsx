import React from 'react';
import Load from '/loader.gif'

const Loader = () => {
    return (
        <img src={Load} alt="Loading..." className='w-[100px] block mx-auto absolute inset-0 my-auto'/>
    )
}

export default Loader;