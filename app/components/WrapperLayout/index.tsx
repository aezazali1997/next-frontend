"use client"
import React, { useEffect, useState } from 'react'
import Sidebar from '../sidebar';
import ButtonAppBar from '../appbar';
import {useRouter} from 'next/navigation'

const WrapperLayout = () => {
  const router = useRouter();
  const [drawerOpen,setDrawerOpen] = useState(false)
  const [auth,setAuth] = useState(false);
  const [role,setRole] = useState('');
  // move this logic into middleware for better code
useEffect(()=>{
  if(localStorage){
    const token =localStorage.getItem('token')
    if(token){
 
      setAuth(true)
      const roleStored = localStorage.getItem('role');

      if(roleStored==='user' && location.pathname.includes('organization')){
      router.push('/')
      }
      setRole(roleStored)
    }
    else{
      router.push('/')
    }
  }

},[])

  return (
    <div>{
      auth &&
      <>
      <ButtonAppBar drawer={drawerOpen} setDrawer={setDrawerOpen} auth={auth} />
          <Sidebar drawer={drawerOpen} setDrawer={setDrawerOpen} role={role} />
      </>
    }
    </div>
  )
}

export default WrapperLayout