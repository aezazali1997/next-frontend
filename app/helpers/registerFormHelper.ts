import { ApiCaller } from "./apiHelper";
import { LocalStorageAccess } from "./localStorage";
import { NotifyType, notify } from "./toast";

export const initialValues = { name: "", email: "", password: "" };

export const registerValidator = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  else if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  } else if (!values.password) {
    errors.password = "Required";
  } 
  return errors;
};

export const registerSubmitHandler = async (router,values,setSubmitting) => {
  try {
    const token = await ApiCaller.registerHandler(values);
    setSubmitting(false);
    notify("Register succesfull, Please login to continue", NotifyType.SUCCESS);
    router.push("/");
  } catch (error) {
    notify(error.message, NotifyType.ERROR);
  }
};
