"use client"
import Image from "next/image";
import BitsolLogo from '../../public/Logo-White-Large.png'
 import { Formik, Form, Field, ErrorMessage } from 'formik';
import Link from "next/link";
import { initialValues, registerSubmitHandler, registerValidator } from "../helpers/registerFormHelper";
import {useRouter} from 'next/navigation'
import { useEffect, useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CustomSelect from "../components/Select";
import { ApiCaller } from "../helpers/apiHelper";



const Register = () => {
  const router = useRouter();
  const [organizations,setOrganizations]=useState([]);


  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  useEffect(()=>{
    const getOrganizationsList = async()=>{
      let data = await ApiCaller.getPublicOrganizations();
      if(data && data.length>0){
        let newArray = data.map((obj)=> {
          return {label:obj.title,value:obj._id}
          })
        setOrganizations(newArray)
      }


    }
    getOrganizationsList();
    
  },[])

  return (
  
       <div className="flex justify-center items-center h-screen w-screen">
  <div className="">
  <Image alt="login picture logo" className="m-auto" src={BitsolLogo} width={200} height={200} priority />
  <div className="flex flex-col w-[500px]">
  <h1 className="text-center mt-4 text-2xl text-primary">Register</h1>
  
  <Formik
       initialValues={initialValues}
       validate={registerValidator}
    onSubmit={(values,{setSubmitting})=> registerSubmitHandler(router,values,setSubmitting)}     >
       {({ isSubmitting,errors }) => (
         <Form className="flex flex-col justify-center gap-y-4 my-4">
            <div>
           <Field type="text" name="name" placeholder="Name" className={`font-serif p-2 border-1 border w-full  rounded-sm ${errors.name ? 'border-red-600' : 'border-gray-300'}`}  />
           <ErrorMessage name="name" component="div" className="text-red-600 ml-2 mt-2"  />
           </div>

           <div>
           <Field type="email" name="email" placeholder="Email" className={`font-serif p-2 border-1 border w-full  rounded-sm ${errors.email ? 'border-red-600' : 'border-gray-300'}`}  />
           <ErrorMessage name="email" component="div" className="text-red-600 ml-2 mt-2"  />
           </div>
           <div>
             <Field type="password" name="password" placeholder="Password" className={`font-serif p-2 border-1 w-full border  rounded-sm ${errors.password ? 'border-red-600' : 'border-gray-300'}`} />
             <ErrorMessage name="password" component="div" className="text-red-600 ml-2 mt-2" />
           </div>
           <div>
             <Field type="text" name="addressLine1" placeholder="Enter Address Line 1" className={`font-serif p-2 border-1 w-full border  rounded-sm border-gray-300`} />
           </div>
            <div>
             <Field type="text" name="addressLine2" placeholder="Enter Address Line 2" className={`font-serif p-2 border-1 w-full border  rounded-sm border-gray-300`} />
           </div>
            <div>
             <Field type="text" name="state" placeholder="State" className={`font-serif p-2 border-1 w-full border  rounded-sm border-gray-300`} />
           </div>
           <div>
             <Field type="text" name="city" placeholder="City" className={`font-serif p-2 border-1 w-full border  rounded-sm border-gray-300`} />
           </div>
           <div>
             <Field type="text" name="country" placeholder="Country" className={`font-serif p-2 border-1 w-full border  rounded-sm border-gray-300`} />
           </div>
           <div>
             <Field type="number" name="phoneNo" placeholder="Phone  number" className={`font-serif p-2 border-1 w-full border  rounded-sm border-gray-300`} />
           </div>
           <div>
           <Field
        className="custom-select"
        name="organizationId"
        options={organizations}
        component={CustomSelect}
        placeholder="Select Organization"
        isMulti={false}
      />


           </div>
           <button className={`p-2 text-xl text-white rounded-lg ${
isSubmitting ? "bg-gray-300" : "bg-primary"

           }`}  type="submit" disabled={isSubmitting}>
             {isSubmitting ? 'Loading...' : 'Submit'}
           </button>
           <span>
           Want to Login ?
           <Link href='/' className="text-primary font-serif ml-2" >Click here </Link>
           </span>
         </Form>



       )}
     </Formik>
  </div>
  </div>
  </div>
  )
}
export default Register;