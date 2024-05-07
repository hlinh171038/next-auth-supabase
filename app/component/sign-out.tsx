"use client"

import { signOut } from 'next-auth/react'
import React from 'react'

const SignOut = () => {

    const handleLogOut = () =>{
        signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/signIn`
        })
    }
  return (
    <div>
      <button onClick={handleLogOut}>log out</button>
    </div>
  )
}

export default SignOut
