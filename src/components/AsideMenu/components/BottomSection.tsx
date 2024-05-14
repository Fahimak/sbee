import React from "react";

import Button from "@app/shared/UI/Button";
import SettingsIcon from "@app/shared/SvgIcons/SettingsIcon";

import styles from "../styles.module.css";

const BottomSection = () => {
  return (
    <div className={styles.bottomSectionContainer}>
      <Button className={styles.settingButton} color="secondary">
        Settings
        <SettingsIcon />
      </Button>
    </div>
  );
};

export default BottomSection;
