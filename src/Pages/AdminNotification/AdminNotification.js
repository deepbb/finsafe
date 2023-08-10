import { useContext, useEffect, useState } from "react";
import {
  NOTIF_COLL_NAME,
  ADMIN_EMAILS,
  USER_NOTIF_COLL_NAME,
  SCROLL_NOTIF,
  ADMIN_NUMBER
} from "../../constants";
import { addData } from "../../API/createDoc";
import { getAllDocs, updateNotifDocs, updateAppDoc } from "../../API/readDoc";
import { showLoading } from "react-global-loading";
import { sortDateList } from "../utilities";
import { AuthContext } from "../../Context/AuthContext";
import "./AdminNotification.css";
import LoadingButton from "../../Components/LoadingButton/LoadingButton";

export default function AdminNotification() {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [notifSend, setNotifSend] = useState(false);
  const [notif, setNotif] = useState("");
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    getAllDocs(SCROLL_NOTIF)
      .then(data => {
        if (data[0] && data[0].text) {
          setNotif(data[0]);
        }
      }).catch(error => { console.error(error) })
  }, [])

  useEffect(() => {
    if (auth) {
      (async () => {
        showLoading(true);
        const notifications = await getAllDocs(NOTIF_COLL_NAME);
        const readNotificationsMap = (
          await getAllDocs(USER_NOTIF_COLL_NAME)
        ).reduce((map, readNotification) => {
          if (map[readNotification.notifId]) {
            map[readNotification.notifId].push(readNotification.identifier);
          } else {
            map[readNotification.notifId] = [readNotification.identifier];
          }
          return map;
        }, {});
        notifications.sort(sortDateList("dateCreated"));
        setNotifications(
          notifications.map((notification) => {
            return {
              ...notification,
              readBy: readNotificationsMap[notification.id] ?? [],
            };
          })
        );
        showLoading(false);
      })();
    }
  }, [auth]);

  const sendHandler = async () => {
    if (message !== "") {
      setSending(true);
      await addData(NOTIF_COLL_NAME, { message });
      notifications.push({ message, dateCreated: null, readBy: [] });
      alert("Notification Sent");
      setMessage("");
      setSending(false);
    } else {
      alert("No message");
    }
  };

  if (!auth || (auth && !ADMIN_NUMBER.includes(parseInt(localStorage.getItem("phone"))))) {
    return (
      <div className="dashboard_container">
        <h1>Admin Services</h1>
        <h1>Please login with a admin account to view this page.</h1>
      </div>
    );
  }

  const sendNotifHandler = () => {
    setNotifSend(true);
    updateAppDoc(SCROLL_NOTIF, notif, "text", "text")
    alert("Scroll Notif Updated Successfully");
    setNotifSend(false);


  }
  return (
    <div>
      <div
        style={{ margin: "0 auto", width: "fit-content", textAlign: "center" }}
      >
        <div>
          <div style={{
            fontSize: "30px",
            fontWeight: "700",
            padding: "10px 10px 10px 10px",
            color: "#923300",
          }}>Add/Edit Scroll Notification</div>
          <textarea
            style={{
              fontSize: "20px",
              fontWeight: "400",
              height: "120px",
              width: "350px",
              border: "2px solid #160057",
            }}
            value={notif.text}
            onChange={(e) => {
              setNotif({ ...notif, text: e.target.value });
            }}
          />
          <div className="notifications">
            <LoadingButton
              style={{
                fontSize: "20px",
                fontWeight: "600",
                margin: "10px",
                padding: "5px",
                borderRadius: "10px",
                backgroundColor: "#072f5f",
                color: "#fff",
                marginBottom: 50
              }}
              loading={notifSend}
              onClick={sendNotifHandler}
            >
              Update Scroll Notification
            </LoadingButton>
          </div>
        </div>
        <div
          style={{
            fontSize: "30px",
            fontWeight: "700",
            padding: "10px 10px 10px 10px",
            color: "#923300",
          }}
        >
          Add Notification
        </div>
        <textarea
          style={{
            fontSize: "20px",
            fontWeight: "400",
            height: "120px",
            width: "350px",
            border: "2px solid #160057",
          }}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <div className="notifications">
          <LoadingButton
            style={{
              fontSize: "20px",
              fontWeight: "600",
              margin: "10px",
              padding: "5px",
              borderRadius: "10px",
              backgroundColor: "#072f5f",
              color: "#fff",
            }}
            loading={sending}
            onClick={sendHandler}
          >
            Send Notification
          </LoadingButton>
        </div>
      </div>
      <div>
        <div
          style={{
            fontSize: "30px",
            fontWeight: "700",
            padding: "10px 10px 10px 10px",
            color: "#923300",
          }}
        >
          Notification History
        </div>
        <table
          style={{
            fontSize: "20px",
            fontWeight: "700",
            border: "3px solid #000",
          }}
        >
          <thead>
            <tr>
              <th>Date Posted</th>
              <th>Message</th>
              <th>Read By</th>
            </tr>
          </thead>
          <tbody>
            {console.log(notifications)}
            {notifications.map((notification) => {
              return (
                <tr>
                  <td>
                    {notification.dateCreated?.toDate().toString() ??
                      "Just Now"}
                  </td>
                  <Box notification={notification} setNotifications={(data) => { setNotifications(data) }} />
                  <td>
                    <ul>
                      {notification && notification.readBy && notification.readBy.length
                        ? notification.readBy.map((user) => <li>{user}</li>)
                        : "No One"}
                    </ul>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const Box = ({ notification, setNotifications }) => {
  const [edit, setEdit] = useState(false);
  const [newMsg, setMsg] = useState(notification.message);
  return (
    <td>
      {!edit && notification.message}
      {edit && <input defaultValue={notification.message} onChange={(e) => { setMsg(e.target.value) }} ></input>}
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly", marginTop: 30 }}>
        {!edit && <div style={{ padding: 3, borderRadius: 4, borderWidth: 1, borderColor: "black", borderStyle: "solid" }} onClick={() => setEdit(true)}>Edit</div>}
        {!edit && <div style={{ padding: 3, borderRadius: 4, borderWidth: 1, borderColor: "black", borderStyle: "solid" }} onClick={async () => {
          let a = await updateNotifDocs(NOTIF_COLL_NAME, notification, true)
          let data = await getAllDocs(NOTIF_COLL_NAME)
          setNotifications(data);
        }}>Delete</div>}
        {edit && <div style={{ padding: 3, borderRadius: 4, borderWidth: 1, borderColor: "black", borderStyle: "solid" }} onClick={async () => {
          if (notification.message === newMsg) {
            setEdit(false);
            return;
          }
          let a = await updateNotifDocs(NOTIF_COLL_NAME, notification, false, newMsg)
          setEdit(false)
          let data = await getAllDocs(NOTIF_COLL_NAME)
          setNotifications(data);
        }}>Save</div>}
        {edit && <div style={{ padding: 3, borderRadius: 4, borderWidth: 1, borderColor: "black", borderStyle: "solid" }} onClick={() => setEdit(false)}>Cancel</div>}
      </div>
    </td>
  )
}