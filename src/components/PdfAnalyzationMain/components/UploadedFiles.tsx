import React from "react";

import type { Documents } from "rooms-model";
import styles from "../styles.module.css";

interface UploadedFilesProps {
  documents: Documents;
}

const UploadedFiles: React.FC<UploadedFilesProps> = ({ documents }) => {
  return (
    <div className={styles.uploadedFileSectionContainer}>
      <h4 className={styles.uploadedFilesSectionTitle}>
        You have uploaded PDF(s):
      </h4>
      <div className={styles.uploadedDocumentsList}>
        {documents.map((doc, index) => {
          return (
            <div key={index} className={styles.uploadedDocument}>
              <div className={styles.uploadedDocumentTitleContainer}>
                <p className={styles.uploadedDocumentTitle}>{doc.title}</p>
              </div>
              <div className={styles.documentTagsContainer}>
                {doc.keywords.map((tag) => {
                  return (
                    <span key={tag} className={styles.documentTags}>
                      {tag}
                    </span>
                  );
                })}
              </div>
              <p className={styles.documentSummary}>
                <strong>Summary: </strong> {doc.summary}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UploadedFiles;
