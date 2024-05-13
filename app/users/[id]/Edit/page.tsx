'use client'
import WrapperLayout from '@/app/components/WrapperLayout';
import { ApiCaller } from '@/app/helpers/apiHelper';
import React, { useEffect, useState } from 'react'
 import { Formik, Form, Field, ErrorMessage } from 'formik';


const Page = ({params}) => {
const [userData,setUserData] = useState();

const handleSubmit = (e,values)=>{
  console.log('e',e,values)
e.preventDefault();
}

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
     { userData &&
        <div className='flex justify-center items-center'>
        <form className='w-[700px] rounded-lg p-4 mt-16 bg-white border border-1 border-gray-200 flex flex-col gap-y-4' onSubmit={handleSubmit}>
        <div className='flex justify-between'>
        <label htmlFor="Name">Name</label>
        <input className='p-2 border border-1 border-gray-200' type='text' value={userData?.name} />
        </div>
        <div className='flex justify-between'>
        <label htmlFor="Email">Email</label>
        <input className='p-2 border border-1 border-gray-200' type='text' value={userData?.email} />

        </div>
        
        <div className='flex justify-between'>
        <label htmlFor="addressLine1">Address Line 1</label>
        <input className='p-2 border border-1 border-gray-200' type='text' value={userData?.addresses[0].addressLine1} />
        </div>

         <div className='flex justify-between'>
        <label htmlFor="addressLine2">Address Line 2</label>
         <input className='p-2 border border-1 border-gray-200' type='text' value={userData?.addresses[0].addressLine2} />

        </div>

         <div className='flex justify-between'>
        <label htmlFor="State">State</label>
          <input className='p-2 border border-1 border-gray-200' type='text' value={userData?.addresses[0].state} />
        </div>

         <div className='flex justify-between'>
        <label htmlFor="city">City</label>
        <input className='p-2 border border-1 border-gray-200' type='text' value={userData?.addresses[0].city} />
        </div>


        <div className='flex justify-between'>
        <label htmlFor="city">Country</label>
        <input className='p-2 border border-1 border-gray-200' type='text' value={userData?.addresses[0].country} />
        </div>

         <div className='flex justify-between'>
        <label htmlFor="Role">Role</label>
            <input className='p-2 border border-1 border-gray-200' type='text' value={userData?.addresses[0].role} />
        </div>

         <div className='flex justify-between'>
        <label htmlFor="phone">Phone No.</label>
        <input className='p-2 border border-1 border-gray-200' type='text' value={userData?.addresses[0].phoneNo} />
        </div>
        <div className='flex justify-center mt-4'>
        <button type="submit" className='bg-primary rounded-lg p-4 w-[300px] text-white'>Submit</button>

        </div>
          </form>

        </div>
      }
    </div>
  )
}
export default Page;
