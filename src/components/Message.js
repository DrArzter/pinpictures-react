import React from 'react';

export default function Message({ msg, isCurrentUser, showAvatarAndName, user }) {
    return (
        <div className={`mb-2 flex ${isCurrentUser ? 'justify-end' : ''}`}>
            {!isCurrentUser && (
                <div className="flex items-start">
                    {showAvatarAndName ? (
                        <img src={msg.senderPic} alt={msg.senderName} className="w-8 h-8 rounded-full mr-2" />
                    ) : (
                        <div className="w-8 h-8 mr-2"></div>
                    )}
                </div>
            )}
            <div className={`max-w-xs ${isCurrentUser ? 'bg-yellow-500' : 'bg-lightModeBackground'} text-lightModeText p-2 rounded`}>
                {showAvatarAndName && !isCurrentUser && <strong>{msg.senderName}</strong>}
                <p>{msg.message}</p>
            </div>

            {isCurrentUser && (
                <div className="flex items-start">
                    {showAvatarAndName ? (
                        <img src={user.picpath} alt={user.name} className="w-8 h-8 rounded-full ml-2" />
                    ) : (
                        <div className="w-8 h-8 ml-2"></div>
                    )}
                </div>
            )}
        </div>
    );
}
