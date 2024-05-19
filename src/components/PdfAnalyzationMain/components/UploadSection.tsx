import React, { ChangeEvent, useRef, FC, useState } from "react";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import classNames from "classnames";
import { useMutation } from "@tanstack/react-query";

import type { Documents } from "rooms-model";
import { useQueryClientContext } from "@app/hooks/roomContextHooks";
import { addDocumentByRoomUUID } from "@app/api/actions";
import UploadProgressModal from "./UploadProgressModal";
import styles from "../styles.module.css";
import { useUploadFileProgress } from "@app/hooks/useUploadFile";

type FilesCollection = File[];

interface DragCollectData {
  isOver: boolean;
}

type Props = {
  roomUUID: string | undefined;
  documents: Documents;
};

const PDFType = "application/pdf";
const availableFileTypes = [PDFType];

const filterFilesToType = (
  files: FilesCollection,
  type: string
): FilesCollection => {
  return files.filter((file) => file.type === type);
};

const UploadSection: FC<Props> = ({ roomUUID, documents }) => {
  const queryClient = useQueryClientContext();
  const { handleProgress, progress } = useUploadFileProgress();
  const [showUploadProgressModal, setShowProgressModal] =
    useState<boolean>(false);
  const [signalController, setSignalController] = useState<
    AbortController | undefined
  >(undefined);

  const hasDocs = !!documents.length;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const addRoomDocumentMutation = useMutation({
    mutationFn: addDocumentByRoomUUID,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
  const addRoomDocument = addRoomDocumentMutation.mutateAsync;

  const addFiles = async (files: FilesCollection) => {
    const formData = new FormData();
    const controller = new AbortController();
    setSignalController(controller);
    setShowProgressModal(true);

    try {
      const filteredFiles = filterFilesToType(files, PDFType);

      filteredFiles.forEach((file) => {
        formData.append("file", file);
      });

      if (roomUUID) {
        await addRoomDocument({
          roomUUID,
          body: formData,
          onUploadProgress: handleProgress,
          cancelSignal: controller.signal,
        });
      }
    } catch (error) {
      // TODO:
    } finally {
      setShowProgressModal(false);
    }
  };

  const handleCancelUploading = () => {
    if (signalController) {
      signalController.abort();
    }
    setShowProgressModal(false);
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

  const handleClickSelectFile = () => {
    fileInputRef.current?.click();
  };

  const classNamesSectionOverlap = classNames(styles.uploadSectionOverWrap, {
    [styles.withDocs]: hasDocs,
  });

  const classNamesContainer = classNames(styles.uploadSectionContainer, {
    [styles.uploadSectionContainerOvered]: isOver,
    [styles.uploadSectionContainerWithDoc]: hasDocs,
  });

  return (
    <div className={classNamesSectionOverlap}>
      {showUploadProgressModal && (
        <UploadProgressModal
          progress={progress}
          onCancel={handleCancelUploading}
        />
      )}
      <div
        className={classNamesContainer}
        ref={dropRef as unknown as React.Ref<HTMLDivElement>}
      >
        {!hasDocs && (
          <p className={styles.uploadSectionTitle}>
            Drag and Drop PDF Files into this area to upload them
          </p>
        )}
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
            {hasDocs
              ? "Click here to select more PDFs"
              : "Or click here to select PDF files from your file system"}
          </button>
        </label>
        {hasDocs && (
          <div className={styles.uploadedFilesSection}>
            <h4 className={styles.uploadedFilesSectionTitle}>
              You have uploaded PDF(s):
            </h4>
            <ul className={styles.uploadedFilesList}>
              {documents.map((doc, index) => {
                return (
                  <li key={index} className={styles.uploadedFilesListItem}>
                    <p className={styles.uploadedFileItemTitle}>{index + 1}.</p>
                    <span
                      className={styles.uploadedFilesListItemContentContainer}
                    >
                      <p>
                        <span className={styles.uploadedFileItemTitle}>
                          Title:{" "}
                        </span>
                        {doc.title}
                      </p>
                      <p>
                        <span className={styles.uploadedFileItemTitle}>
                          Summary:{" "}
                        </span>
                        {doc.summary}
                      </p>
                      <p>
                        <span className={styles.uploadedFileItemTitle}>
                          Keywords:{" "}
                        </span>
                        {doc.keywords?.join(" | ")}
                      </p>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadSection;
