import React from "react";
import TextField from "@app/shared/UI/TextField";

import IconButton from "@app/shared/UI/IconButton";
import SendIcon from "@app/shared/SvgIcons/SendIcon";
import styles from "../styles.module.css";

const ChatInputSection = () => {
  return (
    <div className={styles.inputContainer}>
      <TextField
        placeholder="Ask me something..."
        className={styles.input}
        inputSize="large"
        endIcon={
          <IconButton className={styles.sendButton}>
            <SendIcon />
          </IconButton>
        }
      />
    </div>
  );
};

export default ChatInputSection;
