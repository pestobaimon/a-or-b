import React from "react";
import styles from "./ProfilePic.module.css";

const ProfilePic = ({ src }) => {
    console.log(src);
    return (
        <div className={styles.profileImgContainer}>
            <img className={styles.profileImg} src={src} alt="" />
        </div>
    );
};

export default ProfilePic;
