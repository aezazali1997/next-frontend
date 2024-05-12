import { ApiCaller } from "./apiHelper";
import { LocalStorageAccess } from "./localStorage";
import { NotifyType, notify } from "./toast";

export const loginValidator = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  } else if (!values.password) {
    errors.password = "Required";
  }
  return errors;
};
export const initialValues = { email: "", password: "" };
export const submitHandler = async (router,values,setSubmitting) => {
  try {
    const token = await ApiCaller.loginHandler(values);
    LocalStorageAccess.setToken(token);
    setSubmitting(false);
    notify("Login succesfull", NotifyType.SUCCESS);
    router.push("/users");
  } catch (error) {
    notify(error.message, NotifyType.ERROR);
  }
};
