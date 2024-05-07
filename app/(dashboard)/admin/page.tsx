

import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../../lib/auth'

const Admin = async () => {
    const session = await getServerSession(authOptions)
    console.log(session)
  return (
    <div>
      admin
    </div>
  )
}

export default Admin
