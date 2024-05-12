"use client"
import Image from "next/image";
import BitsolLogo from '../../public/Logo-White-Large.png'
 import { Formik, Form, Field, ErrorMessage } from 'formik';
import Link from "next/link";
import { error } from "console";

const Register = () => {
  return (
  
       <div className="flex justify-center items-center h-screen w-screen">
  <div className="">
  <Image alt="login picture logo" className="m-auto" src={BitsolLogo} width={200} height={200} priority />
  <div className="flex flex-col w-[500px]">
  <h1 className="text-center mt-4 text-2xl text-primary">Register</h1>
  
  <Formik
       initialValues={{ name:'',email: '', password: '',addresses:[],organizationId:'' }}
       validate={values => {
        console.log('values',values)
         const errors = {};
         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         }
         else if (!values.password){
          errors.password = 'Required';

         }
        else if(!errors.organizationId){
          errors.organizationId='Required'
        }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}
     >
       {({ isSubmitting,errors }) => (
         <Form className="flex flex-col justify-center gap-y-4 my-4">
            <div>
           <Field type="text" name="name" placeholder="name" className={`font-serif p-2 border-1 border w-full  rounded-sm ${errors.name ? 'border-red-600' : 'border-gray-300'}`}  />
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
             <Field type="text" name="country" placeholder="Country" className={`font-serif p-2 border-1 w-full border  rounded-sm border-gray-300`} />
           </div>
           <div>
             <Field type="number" name="phoneNo" placeholder="Phone  number" className={`font-serif p-2 border-1 w-full border  rounded-sm border-gray-300`} />
           </div>

           <div>
           
  <select id="organization" name="organizationId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary focus:border-primary block w-full p-2.5 ">
   <ErrorMessage name="organizationId" component="div" className="text-red-600 ml-2 mt-2" />
    <option selected>Choose an Organization</option>
    <option value="US">United States</option>
    <option value="CA">Canada</option>
    <option value="FR">France</option>
    <option value="DE">Germany</option>
  </select>

           </div>
           <button className="bg-primary p-2 text-xl text-white rounded-lg" type="submit" disabled={isSubmitting}>
             Submit
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