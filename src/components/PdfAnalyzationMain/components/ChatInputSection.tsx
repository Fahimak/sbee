import { useState } from "react";
import TextField from "@app/shared/UI/TextField";

import IconButton from "@app/shared/UI/IconButton";
import SendIcon from "@app/shared/SvgIcons/SendIcon";
import styles from "../styles.module.css";
import { useMutation } from "@tanstack/react-query";
import { addMessagesInChatRoom } from "@app/api/actions";
import { useQueryClientContext } from "@app/hooks/roomContextHooks";

interface Props {
  roomUUID: string;
}

const ChatInputSection: React.FC<Props> = ({ roomUUID }) => {
  const queryClient = useQueryClientContext();

  const addMessageInRoomMutation = useMutation({
    mutationFn: addMessagesInChatRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

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
        maxLength={510}
        endIcon={
          <IconButton className={styles.sendButton} type="submit">
            <SendIcon />
          </IconButton>
        }
        disabled={addMessageInRoomMutation.isPending}
      />
    </form>
  );
};

export default ChatInputSection;
