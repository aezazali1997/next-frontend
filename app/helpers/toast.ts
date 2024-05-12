import { toast } from "react-toastify";

export enum NotifyType {
  ERROR = "error",
  SUCCESS = "success",
}
export const notify = (message, type: NotifyType) => {
  switch (type) {
    case NotifyType.ERROR: {
      return toast.error(message);
    }
    case NotifyType.SUCCESS: {
      return toast.success(message);
    }
  }
};
