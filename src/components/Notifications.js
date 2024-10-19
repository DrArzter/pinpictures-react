import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";



export default function Notification({ notifications, setNotifications, socket, socketEvent, socketState }) {

  const navigate = useNavigate();
  useEffect(() => {
    const timers = notifications.map((notification, index) =>
      setTimeout(() => {
        setNotifications((prevNotifications) =>
          prevNotifications.filter((_, i) => i !== index)
        );
      }, notification.time ? notification.time : 3000)
    );

    return () => timers.forEach(clearTimeout);
  }, [notifications, setNotifications]);

  useEffect(() => {
    if (!socketEvent) return;

    if (socketEvent.type !== "notification") {
      return;
    }

    setNotifications((prevNotifications) => [...prevNotifications, { status: socketEvent.message.message_type, message: socketEvent.message.message }]);

  }, [socketEvent]);

  const getNotificationClassName = (status, clickable) =>
    `notification p-4 rounded-2xl shadow-2xl mt-2 ${clickable ? "cursor-pointer" : ""} ${
      status === "success"
        ? "bg-green-500"
        : status === "error"
        ? "bg-red-500"
        : status === "info"
        ? "bg-cyan-700"
        : "bg-yellow-500"
    }`;

  return (
    <div id="notification-container" className="fixed top-0 right-0 mt-20 mr-14 z-[999] space-y-2">
      {notifications.map((notification, index) => (
        <div key={index} className={getNotificationClassName(notification.status, notification.clickable)}  onClick={notification.clickable ? () => navigate(notification.link_to) : null}> 
          <p className="text-white">{notification.message}</p>
        </div>
      ))}
    </div>
  );
}