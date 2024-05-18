import React, { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";

import { getRoomMessages } from "@app/api/actions";

import styles from "../styles.module.css";
import clientApi from "@app/api";
import classNames from "classnames";

interface Props {
  roomUUID: string;
}

const ChatMessages: React.FC<Props> = ({ roomUUID }) => {
  const loadData = useCallback(
    async () => await getRoomMessages(roomUUID),
    [roomUUID]
  );

  const roomMessages = useQuery({
    queryKey: ["messages", roomUUID],
    queryFn: loadData,
    refetchInterval: 30000,
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
    refetchOnReconnect: true,
  });

  const messages = roomMessages?.data || [];

  return (
    <div className={styles.chanMessagesScrollContainer}>
      <div className={styles.chatMessagesContainer}>
        {!!messages.length &&
          messages.map((message) => {
            return (
              <MessageItem
                key={message.message_id}
                messageContent={message.message_content}
                isOwner={message.sender_id === clientApi.userId}
                dateCreate={new Date(message.timestamp).toLocaleString()}
                messageResponse={message.message_response}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ChatMessages;

type MessageItemProps = {
  messageContent: string;
  messageResponse: string;
  isOwner: boolean;
  dateCreate: string;
};

const MessageItem: React.FC<MessageItemProps> = ({
  dateCreate,
  isOwner,
  messageContent,
  messageResponse,
}) => {
  const messageContainerClassNames = classNames(styles.messageContainer, {
    [styles.messageContainerOwner]: isOwner,
  });

  const messageClassNames = classNames(styles.message, {
    [styles.messageOwner]: isOwner,
  });

  return (
    <div className={messageContainerClassNames}>
      <div className={messageClassNames}>
        <p>{messageContent}</p>
      </div>
      <div className={styles.messageResponse}>
        <p>{messageResponse}</p>
      </div>
    </div>
  );
};

// {
//     "intent": "documnent_summary",
//     "message_content": "I got it.",
//     "message_id": "6645ea1d640bb3de9d731768",
//     "message_response": "Machine learning has witnessed significant advancements in recent years.",
//     "room_uuid": "6645d413640bb3de9d73171b",
//     "sender_id": "993378",
//     "timestamp": "Thu, 16 May 2024 11:12:29 GMT"
// }
