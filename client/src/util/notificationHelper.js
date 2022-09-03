import { toast } from "react-toastify";

const getToastType = (type) => {
  let toastType = toast.TYPE.INFO;
  if (type === "info") toastType = toast.TYPE.INFO;
  else if (type === "error") toastType = toast.TYPE.ERROR;
  else if (type === "success") toastType = toast.TYPE.SUCCESS;
  return toastType;
};

export const sendNotification = (msg, type, darkMode) => {
  const toastType = getToastType(type);
  toast(msg, {
    position: "top-center",
    autoClose: 4000,
    theme: darkMode ? "dark" : "light",
    type: toastType,
  });
};
