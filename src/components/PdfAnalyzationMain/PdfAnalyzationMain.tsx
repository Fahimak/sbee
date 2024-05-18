import { memo } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import UploadSection from "./components/UploadSection";
import ChatInputSection from "./components/ChatInputSection";
import ChatMessages from "./components/ChatMessages";

import styles from "./styles.module.css";
import { ChatRoom } from "rooms-model";
import classNames from "classnames";

interface Props {
  room: ChatRoom;
}

const PdfAnalyzationMain: React.FC<Props> = ({ room }) => {
  const hasDocs = !!room?.documents?.length;

  const classNamesContainer = classNames(styles.container, {
    [styles.containerWithDocks]: hasDocs,
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={classNamesContainer}>
        <UploadSection
          roomUUID={room?.room_uuid}
          documents={room?.documents || []}
        />
        {hasDocs && (
          <>
            <ChatMessages roomUUID={room?.room_uuid} />
            <ChatInputSection roomUUID={room.room_uuid} />
          </>
        )}
      </div>
    </DndProvider>
  );
};

export default memo(PdfAnalyzationMain);
