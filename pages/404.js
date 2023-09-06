import React from 'react'
import Link from "next/link";


export default function Error() {

    return (
     <div className='contError'>
         <img  src="https://dc591.4shared.com/img/guWjQnhtku/s24/189eb234300/wp2414723-404-wallpapers?async&rand=0.6282162116665229" alt="" />
        <div className='errorLink'>
            <h5>To Back To Log In : </h5>
            <Link href='/'>Log In</Link>
        </div>



     </div>
    )
}
