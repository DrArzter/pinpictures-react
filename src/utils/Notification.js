import React, { useEffect, useState } from "react";

export default function Notification({ notifications, setNotifications }) {
    useEffect(() => {
        const timers = notifications.map((notification, index) =>
            setTimeout(() => {
                setNotifications((prevNotifications) => {
                    return prevNotifications.filter((_, i) => i !== index);
                });
            }, 5000)
        );

        return () => {
            timers.forEach(timer => clearTimeout(timer));
        };
    }, [notifications, setNotifications]);

    return (
        <div id="notification-container" className="fixed top-0 right-0 mt-20 mr-4 z-50">
            {notifications.map((notification, index) => (
                <div
                    key={index}
                    className={`notification ${notification.status} text-white p-4 rounded-2xl shadow-2xl mt-2`}
                >
                    {notification.message}
                </div>
            ))}
        </div>
    );
}
