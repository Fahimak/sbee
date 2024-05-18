import React, { FC, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import Link from "next/link";

import IconButton from "@app/shared/UI/IconButton";
import PenIcon from "@app/shared/SvgIcons/PenIcon";

import styles from "../styles.module.css";

import EditForm from "./EditForm";

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

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleClickEdit = () => {
    requestAnimationFrame(() => {
      setIsEdit(true);
    });
  };

  const closeEditModeAndSaveChanges = useCallback(async () => {
    setIsEdit(false);
  }, []);

  const roomLinkClassNames = classNames(styles.previousSectionListItemButton, {
    [styles.activeLink]: isActivePath,
  });

  return (
    <li className={styles.previousSectionListItem}>
      {isEdit ? (
        <EditForm
          roomName={roomName}
          onSubmit={closeEditModeAndSaveChanges}
          roomUUID={roomUUID}
        />
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
