import { createContext, useContext, useEffect, useState } from "react";
import { getAllDocs, getDocs } from "../../API/readDoc";
import { NOTIF_COLL_NAME, USER_NOTIF_COLL_NAME } from "../../constants";
import { AuthContext } from "../AuthContext";

export const NotificationsContext = createContext();

export function NotificationsContextProvider({ children }) {
  const [newNotifications, setNewNotifications] = useState([]);
  const { getIdentifier, auth } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      if (auth) {
        const notifications = await getAllDocs(NOTIF_COLL_NAME);
        const readNotificationIds = (
          await getDocs(USER_NOTIF_COLL_NAME, {
            identifier: getIdentifier(),
          })
        ).map((n) => n.notifId);

        setNewNotifications([
          ...notifications.filter(
            (notif) => !readNotificationIds.includes(notif.id)
          ),
        ]);
      }
    })();
  }, [auth]);

  return (
    <NotificationsContext.Provider
      value={{ newNotifications, setNewNotifications }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}
