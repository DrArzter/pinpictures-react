import React, { useEffect } from "react";

export default function Notification({ notifications, setNotifications }) {
  useEffect(() => {
    const timers = notifications.map((notification, index) =>
      setTimeout(() => {
        setNotifications((prevNotifications) =>
          prevNotifications.filter((_, i) => i !== index)
        );
      }, 3000)
    );

    return () => timers.forEach(clearTimeout);
  }, [notifications, setNotifications]);

  const getNotificationClassName = (status) =>
    `notification p-4 rounded-2xl shadow-2xl mt-2 ${
      status === "success"
        ? "bg-green-500"
        : status === "error"
        ? "bg-red-500"
        : "bg-gray-700"
    }`;

  return (
    <div id="notification-container" className="fixed top-0 right-0 mt-20 mr-14 z-[999] space-y-2">
      {notifications.map((notification, index) => (
        <div key={index} className={getNotificationClassName(notification.status)}>
          <p className="text-white">{notification.message}</p>
        </div>
      ))}
    </div>
  );
}