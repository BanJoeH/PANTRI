import { store } from "react-notifications-component";

export const notification = (title, msg) => {
  store.addNotification({
    title: title,
    message: msg,
    type: "success",
    insert: "bottom",
    container: "bottom-center",
    dismiss: {
      duration: 2000,
    },
  });
};
