import Modal from "react-modal";
import LoadingButton from "../LoadingButton";
import { useState } from "react";
import { addBatchedData } from "../../API/createDoc";
import { USER_NOTIF_COLL_NAME } from "../../constants";

export default function NotificationsModal({
  isOpen,
  closeModal,
  newNotifications,
  setNewNotifications,
  getIdentifier,
}) {
  const [marking, setMarking] = useState(false);
  const markReadHandler = async () => {
    if (window.confirm("Marking read will remove notifications")) {
      setMarking(true);
      await addBatchedData(
        USER_NOTIF_COLL_NAME,
        newNotifications.map((notif) => ({
          identifier: getIdentifier(),
          notifId: notif.id,
        }))
      );
      setNewNotifications([]);
      setMarking(false);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="New Notifications"
      customStyles={{ height: "fit-content" }}
    >
      <div>New Notifications</div>
      <table>
        <thead>
          <tr>
            <th>Date Sent</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {newNotifications.map((notification) => {
            return (
              <tr key={notification.id}>
                <td>{notification?.dateCreated?.toDate().toString()}</td>
                <td>{notification.message}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <LoadingButton
        loading={marking}
        onClick={markReadHandler}
        className="dashboard_submit"
      >
        Mark Read
      </LoadingButton>
    </Modal>
  );
}
