

import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../../lib/auth'
import SignOut from '../../component/sign-out'

const Admin = async () => {
    const session = await getServerSession(authOptions)
    console.log(session)

   
  return (
    <div>
      welcome to admin page 
        <div>hello {session?.user?.name}</div>
        <SignOut/>
    </div>
  )
}

export default Admin
