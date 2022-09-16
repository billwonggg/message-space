import { toast } from "react-toastify";

const getToastType = (type) => {
  let toastType = toast.TYPE.INFO;
  if (type === "info") toastType = toast.TYPE.INFO;
  else if (type === "error") toastType = toast.TYPE.ERROR;
  else if (type === "success") toastType = toast.TYPE.SUCCESS;
  else if (type === "warning") toastType = toast.TYPE.WARNING;
  return toastType;
};

export const sendNotif = (msg, type, darkMode) => {
  const toastType = getToastType(type);
  toast(msg, {
    position: "top-center",
    autoClose: 3000,
    theme: darkMode ? "dark" : "light",
    type: toastType,
  });
};

export const updateNotif = (id, msg, type, darkMode) => {
  toast.update(id, {
    render: msg,
    type: type,
    isLoading: false,
    autoClose: 3000,
    position: "top-center",
    theme: darkMode ? "dark" : "light",
  });
};

export const loadingNotif = (msg, darkMode) => {
  return toast.loading(msg, { theme: darkMode ? "dark" : "light", position: "top-center" });
};
