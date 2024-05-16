import { useState } from "react";
import TextField from "@app/shared/UI/TextField";

import IconButton from "@app/shared/UI/IconButton";
import SendIcon from "@app/shared/SvgIcons/SendIcon";
import styles from "../styles.module.css";
import { useRoomActionsContext } from "@app/hooks/roomContextHooks";
import { TEST_USER_ID } from "@app/api";

interface Props {
  roomUUID: string;
}

const ChatInputSection: React.FC<Props> = ({ roomUUID }) => {
  const { addMessageInRoomMutation } = useRoomActionsContext();

  const [message, setMessage] = useState<string>("");

  const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.currentTarget.value);
  };

  const handleClickSendMessage = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!message?.trim() || message.length > 510) {
      return;
    }

    await addMessageInRoomMutation.mutateAsync({
      room_uuid: roomUUID,
      message_content: message.trim(),
      sender_id: TEST_USER_ID,
    });
    setMessage("");
  };

  return (
    <form className={styles.inputContainer} onSubmit={handleClickSendMessage}>
      <TextField
        placeholder="Ask me something..."
        className={styles.input}
        inputSize="large"
        onChange={handleChangeMessage}
        value={message}
        endIcon={
          <IconButton className={styles.sendButton} type="submit">
            <SendIcon />
          </IconButton>
        }
      />
    </form>
  );
};

export default ChatInputSection;
