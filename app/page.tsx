"use client";
import Image from "next/image";
import BitsolLogo from "../public/Logo-White-Large.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { useState } from "react";
import { ApiCaller } from "./helpers/apiHelper";
import { LocalStorageAccess } from "./helpers/localStorage";
import { useRouter } from "next/navigation";
import { initialValues, loginValidator, submitHandler } from "./helpers/loginFormHelpers";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="">
        <Image
          alt="login picture logo"
          className="m-auto"
          src={BitsolLogo}
          width={200}
          height={200}
          priority
        />
        <div className="flex flex-col">
          <h1 className="text-center mt-4 text-2xl text-primary">Login</h1>

          <Formik
            initialValues={initialValues}
            validate={loginValidator}
            onSubmit={(values,{setSubmitting})=> submitHandler(router,values,setSubmitting)}
          >
            {({ isSubmitting, errors }) => (
              <Form className="flex flex-col justify-center gap-y-4 my-4">
                <div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className={`font-serif p-2 border-1 border w-full  rounded-sm ${
                      errors.email ? "border-red-600" : "border-gray-300"
                    }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600 ml-2 mt-2"
                  />
                </div>
                <div>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className={`font-serif p-2 border-1 w-full border  rounded-sm ${
                      errors.password ? "border-red-600" : "border-gray-300"
                    }`}
                  />

                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 ml-2 mt-2"
                  />
                </div>
                <button
                  className={` p-2 text-xl text-white rounded-lg ${
                    isSubmitting ? "bg-gray-300" : "bg-primary"
                  }`}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Loading..." : "Submit"}
                </button>
                <span>
                  Want to register ?
                  <Link
                    href="/register"
                    className="text-primary font-serif ml-2"
                  >
                    Click here
                  </Link>
                </span>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
