import React from "react";

import Modal from "@app/shared/UI/Modal";
import styles from "../styles.module.css";

type UploadProgressModalProps = {
  progress: number | string;
  onCancel: () => void;
};

const UploadProgressModal: React.FC<UploadProgressModalProps> = ({
  progress,
  onCancel,
}) => {
  return (
    <Modal
      title={`Uploading PDFs is in progress... ${progress}%`}
      classNameBody={styles.uploadModal}
      onClose={onCancel}
    />
  );
};

export default UploadProgressModal;
