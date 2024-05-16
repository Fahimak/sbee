"use client";
import React, { ChangeEvent, useRef, FC } from "react";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import classNames from "classnames";

import styles from "../styles.module.css";
import { useRoomActionsContext } from "@app/hooks/roomContextHooks";

type FilesCollection = File[];

interface DragCollectData {
  isOver: boolean;
}

type Props = {
  roomUUID: string | undefined;
  hasDocs: boolean;
};

const PDFType = "application/pdf";
const availableFileTypes = [PDFType];

const filterFilesToType = (
  files: FilesCollection,
  type: string
): FilesCollection => {
  return files.filter((file) => file.type === type);
};

const UploadSection: FC<Props> = ({ roomUUID, hasDocs }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { addRoomDocument } = useRoomActionsContext();

  const addFiles = async (files: FilesCollection) => {
    const filteredFiles = filterFilesToType(files, PDFType);

    const formData = new FormData();

    filteredFiles.forEach((file) => {
      formData.append("file", file);
    });

    if (roomUUID) {
      addRoomDocument.mutate({ roomUUID, body: formData });
    }
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
    [addFiles]
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

  const handleClickSelectFile = (e: React.MouseEvent) => {
    fileInputRef.current?.click();
  };

  const classNamesContainer = classNames(styles.uploadSectionContainer, {
    [styles.uploadSectionContainerOvered]: isOver,
    // [styles.withDocs]: hasDocs,
  });

  const classNamesSectionOverlap = classNames(styles.uploadSectionOverWrap, {
    [styles.withDocs]: hasDocs,
  });

  return (
    <div className={classNamesSectionOverlap}>
      <div
        className={classNamesContainer}
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
    </div>
  );
};

export default UploadSection;
