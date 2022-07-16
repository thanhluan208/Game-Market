import { NotificationManager } from "react-notifications";



export const CreateNotification = (type, message, title) => {


  switch (type) {
    case "info":
      NotificationManager.info(message,title,1000);
      break;
    case "success":
      NotificationManager.success(message,title,1000);
      break;
    case "warning":
      NotificationManager.warning(message,title,1000);
      break;
    case "error":
      NotificationManager.error(message,title,1000);
           
      break;
    default:
  }
};
