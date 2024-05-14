import React from "react";

import WhiteBlockLayout from "@app/shared/WhiteBlockLayout";
import AddNewButton from "./components/AddNewButton";
import PreviousProjectsSection from "./components/PreviousProjectsSection";
import BottomSection from "./components/BottomSection";

import styles from "./styles.module.css";

const AsideMenu = () => {
  return (
    <WhiteBlockLayout className={styles.container}>
      <AddNewButton />
      <PreviousProjectsSection />
      <BottomSection />
    </WhiteBlockLayout>
  );
};

export default AsideMenu;
