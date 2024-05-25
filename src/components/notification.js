import React, { useEffect } from "react";

export default function Notification({ notifications, setNotifications }) {
  useEffect(() => {
    const timers = notifications.map((notification, index) =>
      setTimeout(() => {
        setNotifications((prevNotifications) =>
          prevNotifications.filter((_, i) => i !== index)
        );
      }, 5000)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [notifications, setNotifications]);

  return (
    <div
      id="notification-container"
      className="fixed top-0 right-0 mt-20 mr-4 z-50 space-y-2"
    >
      {notifications.map((notification, index) => (
        <div
          key={index}
          className={`notification p-4 rounded-2xl shadow-2xl mt-2 ${
            notification.status === "success"
              ? "bg-green-500"
              : notification.status === "error"
              ? "bg-red-500"
              : "bg-gray-700"
          }`}
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
}
