'use client'
import WrapperLayout from '@/app/components/WrapperLayout'
import { ApiCaller } from '@/app/helpers/apiHelper'
import { NotifyType, notify } from '@/app/helpers/toast'
import React, { useEffect, useState } from 'react'

const page = ({params}) => {
  const [userData,setUserData] = useState();

   useEffect(()=>{

const getUser = async()=>{
  try{
   let data = await ApiCaller.getUserInfo(params.id)
    if(data){
      setUserData(data)
    }
  } catch (error) {
    console.log('error',error.message)
  }
}
getUser();
   },[])

  return (
    <div>
      <WrapperLayout />
      {
        <div className='flex justify-center items-center'>
        <div className='w-[700px] rounded-md p-4 mt-16 bg-gray-100 flex flex-col gap-y-4'>
        <div className='flex justify-between'>
        <label htmlFor="Name">Name</label>
        <span>{userData?.name}</span>
        </div>
        <div className='flex justify-between'>
        <label htmlFor="Email">Email</label>
        <span>{userData?.email}</span>
        </div>
        <div className='flex justify-between'>
        <label htmlFor="role">Role</label>
        <span>{userData?.role}</span>
        </div>
        
        <div className='flex justify-between'>
        <label htmlFor="addressLine1">Address Line 1</label>
        <span>{userData?.addresses[0].addressLine1}</span>
        </div>

         <div className='flex justify-between'>
        <label htmlFor="addressLine2">Address Line 2</label>
        <span>{userData?.addresses[0].addressLine2}</span>
        </div>

         <div className='flex justify-between'>
        <label htmlFor="State">State</label>
        <span>{userData?.addresses[0].state}</span>
        </div>

         <div className='flex justify-between'>
        <label htmlFor="city">City</label>
        <span>{userData?.addresses[0].city}</span>
        </div>


        <div className='flex justify-between'>
        <label htmlFor="city">Country</label>
        <span>{userData?.addresses[0].country}</span>
        </div>

         <div className='flex justify-between'>
        <label htmlFor="Role">Role</label>
        <span>{userData?.addresses[0].role}</span>
        </div>

         <div className='flex justify-between'>
        <label htmlFor="phone">Phone No.</label>
        <span>{userData?.addresses[0].phoneNo}</span>
        </div>


        </div>

        </div>
      }
</div>
  )
}

export default page