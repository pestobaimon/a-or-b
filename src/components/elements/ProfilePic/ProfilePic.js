import React from "react";
import styles from "./ProfilePic.module.css";

const ProfilePic = ({ src }) => {
    const imgUrl = src
      ? src
      : "https://firebasestorage.googleapis.com/v0/b/a-or-b-8c21c.appspot.com/o/default_profile_pic.png?alt=media&token=77062b42-d95d-404e-bb82-e7939dbad88d";
    return (
      <div className={styles.profileImgContainer}>
        <img className={styles.profileImg} src={imgUrl} alt="" />
      </div>
    );
};

export default ProfilePic;
