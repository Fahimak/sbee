import React, { FC, useState } from "react";
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
  const [newRoomName, setNewRoomName] = useState<string>(roomName);

  const handleClickEdit = () => {
    requestAnimationFrame(() => {
      setIsEdit(true);
    });
  };

  const roomLinkClassNames = classNames(styles.previousSectionListItemButton, {
    [styles.activeLink]: isActivePath,
  });

  return (
    <li className={styles.previousSectionListItem}>
      {isEdit ? (
        <EditForm
          roomName={newRoomName}
          currentRoomName={roomName}
          onSubmit={setIsEdit.bind(null, false)}
          roomUUID={roomUUID}
          onChangeRoomName={setNewRoomName}
        />
      ) : (
        <>
          <Link className={roomLinkClassNames} href={`/${roomId}`}>
            {newRoomName}
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
