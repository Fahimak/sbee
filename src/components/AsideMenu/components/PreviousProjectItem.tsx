"use client";
import React, { FC, useState, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import Link from "next/link";

import IconButton from "@app/shared/UI/IconButton";
import PenIcon from "@app/shared/SvgIcons/PenIcon";
import ClickAwayListener from "@app/shared/UI/ClickAwayListener";
import styles from "../styles.module.css";

import EditForm from "./EditForm";
import { useRoomActionsContext } from "@app/hooks/roomContextHooks";

interface PreviousProjectItemProps {
  roomUUID: string;
  roomId: string;
  roomName: string;
}

const PreviousProjectItem: FC<PreviousProjectItemProps> = ({
  roomId,
  roomName,
  roomUUID,
}) => {
  const pathname = usePathname();
  const isActivePath = pathname.includes(roomId);

  const { updateRoomName } = useRoomActionsContext();

  const fromRef = useRef<HTMLFormElement>(null);

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleClickEdit = () => {
    requestAnimationFrame(() => {
      setIsEdit(true);
    });
  };

  const closeEditModeAndSaveChanges = useCallback(async () => {
    const value = (fromRef?.current?.roomName.value || "").trim();
    if (value && value !== roomName) {
      await updateRoomName.mutateAsync({
        room_name: value,
        roomUUID: roomUUID,
      });
    }
    setIsEdit(false);
  }, [roomName, roomUUID, updateRoomName]);

  const roomLinkClassNames = classNames(styles.previousSectionListItemButton, {
    [styles.activeLink]: isActivePath,
  });

  return (
    <li className={styles.previousSectionListItem}>
      {isEdit ? (
        <ClickAwayListener onClickAway={closeEditModeAndSaveChanges}>
          <EditForm
            projectName={roomName}
            onSubmit={closeEditModeAndSaveChanges}
            ref={fromRef}
          />
        </ClickAwayListener>
      ) : (
        <>
          <Link className={roomLinkClassNames} href={`/${roomId}`}>
            {roomName}
          </Link>
          <IconButton onClick={handleClickEdit} className={styles.editButton}>
            <PenIcon />
          </IconButton>
        </>
      )}
    </li>
  );
};

export default PreviousProjectItem;
