import React from "react";

import PdfAnalyzationMain from "@app/components/PdfAnalyzationMain";
import styles from "../styles.module.css";

const PdfAnalyzation = () => {
  return (
    <div className={styles.pageContainer}>
      <PdfAnalyzationMain />
    </div>
  );
};

export default PdfAnalyzation;
