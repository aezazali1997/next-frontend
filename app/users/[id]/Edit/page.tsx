'use client'
import WrapperLayout from '@/app/components/WrapperLayout';
import { ApiCaller } from '@/app/helpers/apiHelper';
import React, { useEffect, useState } from 'react'
 import { Formik, Form, Field, ErrorMessage } from 'formik';


const Page = ({params}) => {
const [userData,setUserData] = useState();
const [readyToSubmit,setReadyToSubmit]= useState(false)

const handleSubmit = async(e)=>{
e.preventDefault();
    const elements = new FormData(e.currentTarget)
    const editedForm = {
      name : elements.get("name"),
      email: elements.get('email'),
      addresses:[
        {
          addressLine1: elements.get('addressLine1'),
          addressLine2: elements.get('addressLine2'),
          state: elements.get('state'),
          city: elements.get('city'),
          role: elements.get('role'),
          phoneNo: elements.get('phoneNo'),
          country: elements.get('country'),
        }
      ]
    }
    try
    {
    await ApiCaller.updateUserInfo(params.id,editedForm)
    window.location.reload()
    }
   catch(error){
    console.error(error.message)
    
   }
    
    


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
        <form className='w-[700px] rounded-lg p-4 mt-16 bg-white border border-1 border-gray-200 flex flex-col gap-y-4' onSubmit={handleSubmit} onChange={()=>{setReadyToSubmit(true)}}>
        <div className='flex justify-between'>
        <label htmlFor="Name">Name</label>
        <input className='p-2 border border-1 border-gray-200' name='name' type='text' defaultValue={userData?.name} />
        </div>
        <div className='flex justify-between'>
        <label htmlFor="Email">Email</label>
        <input className='p-2 border border-1 border-gray-200' name='email' type='text' defaultValue={userData?.email} />

        </div>
        
        <div className='flex justify-between'>
        <label htmlFor="addressLine1" >Address Line 1</label>
        <input className='p-2 border border-1 border-gray-200' name='addressLine1' type='text' defaultValue={userData?.addresses[0].addressLine1} />
        </div>

         <div className='flex justify-between'>
        <label htmlFor="addressLine2">Address Line 2</label>
         <input className='p-2 border border-1 border-gray-200' name='addressLine2' type='text' defaultValue={userData?.addresses[0].addressLine2} />

        </div>

         <div className='flex justify-between'>
        <label htmlFor="State">State</label>
          <input className='p-2 border border-1 border-gray-200' name='state' type='text' defaultValue={userData?.addresses[0].state} />
        </div>

         <div className='flex justify-between'>
        <label htmlFor="city">City</label>
        <input className='p-2 border border-1 border-gray-200' name='city' type='text' defaultValue={userData?.addresses[0].city} />
        </div>


        <div className='flex justify-between'>
        <label htmlFor="city">Country</label>
        <input className='p-2 border border-1 border-gray-200' name='country' type='text' defaultValue={userData?.addresses[0].country} />
        </div>

         <div className='flex justify-between'>
        <label htmlFor="Role">Role</label>
            <input className='p-2 border border-1 border-gray-200' name='role' type='text' defaultValue={userData?.addresses[0].role} />
        </div>

         <div className='flex justify-between'>
        <label htmlFor="phone">Phone No.</label>
        <input className='p-2 border border-1 border-gray-200' name='phoneNo' type='text' defaultValue={userData?.addresses[0].phoneNo} />
        </div>
        <div className='flex justify-center mt-4'>
        <button type="submit"  disabled={!readyToSubmit} className={` rounded-lg p-4 w-[300px] ${readyToSubmit ? 'bg-primary text-white' : 'bg-gray-100 text-gray-300'}`}>Submit</button>

        </div>
          </form>

        </div>
      }
    </div>
  )
}
export default Page;
