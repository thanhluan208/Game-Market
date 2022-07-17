import { NotificationManager } from "react-notifications";



export const CreateNotification = (type, message, title,interval = 1000) => {


  switch (type) {
    case "info":
      NotificationManager.info(message,title,interval);
      break;
    case "success":
      NotificationManager.success(message,title,interval);
      break;
    case "warning":
      NotificationManager.warning(message,title,interval);
      break;
    case "error":
      NotificationManager.error(message,title,interval);
           
      break;
    default:
  }
};
