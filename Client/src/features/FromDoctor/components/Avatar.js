import React from "react";
import defaultAvatar from "../../../shared/FromDoctor/images/avatar.png";

const Avatar = ({ src, size = 100 }) => {
  return (
    <div className="avatar">
      {src ? (
        <img src={src} alt="Avatar" className="avatar-pic" />
      ) : (
        <img src={defaultAvatar} alt="Avatar" />
      )}
    </div>
  );
};

export default Avatar;
