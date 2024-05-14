"use client";
import React, { ChangeEvent, useState, useRef } from "react";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import classNames from "classnames";

import styles from "../styles.module.css";

type FileWithId = File & { id: string };
type FilesCollection = File[];

interface DragCollectData {
  isOver: boolean;
}

const PDFType = "application/pdf";
const availableFileTypes = [PDFType];

const filterFilesToType = (
  files: FilesCollection,
  type: string
): FileWithId[] => {
  return files
    .filter((file) => file.type === type)
    .map((i) => {
      Reflect.set(i, "id", crypto.randomUUID());
      return i as FileWithId;
    });
};

const UploadSection = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadedFiles, setFiles] = useState<FileWithId[]>([]);

  const addFiles = (files: FilesCollection) => {
    const filteredFiles = filterFilesToType(files, PDFType);
    setFiles((prev) => [...prev, ...filteredFiles]);
  };

  const [{ isOver }, dropRef] = useDrop<
    { files: FilesCollection },
    any,
    DragCollectData
  >(
    () => ({
      accept: [NativeTypes.FILE],
      drop: ({ files }) => {
        addFiles(Array.from(files));
      },

      collect: (monitor: DropTargetMonitor) => {
        return {
          isOver: monitor.isOver(),
        };
      },
    }),
    []
  );

  const handleChangeUploadFilesInput = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.currentTarget.files;

    if (files?.length) {
      addFiles(Array.from(files));
    }

    event.currentTarget.value = "";
  };

  const handleClickDeleteFile = (id: string) => () => {
    setFiles((files) => files?.filter((f) => f.id !== id));
  };

  const handleClickSelectFile = (e: React.MouseEvent) => {
    // e.preventDefault();
    fileInputRef.current?.click();
  };

  return (
    <>
      <div
        className={classNames(styles.uploadSectionContainer, {
          [styles.uploadSectionContainerOvered]: isOver,
        })}
        ref={dropRef as unknown as React.Ref<HTMLDivElement>}
      >
        <p className={styles.uploadSectionTitle}>
          Drag and Drop PDF Files into this area to upload them
        </p>
        <label>
          <button
            onClick={handleClickSelectFile}
            className={styles.uploadSectionTitleLabel}
          >
            <input
              type="file"
              style={{ display: "none" }}
              accept={availableFileTypes.toString()}
              multiple
              onChange={handleChangeUploadFilesInput}
              ref={fileInputRef}
            />
            Or click here to select PDF files from your file system
          </button>
        </label>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        {uploadedFiles?.map((file) => {
          return (
            <button key={file.id} onClick={handleClickDeleteFile(file.id)}>
              {file.name}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default UploadSection;
