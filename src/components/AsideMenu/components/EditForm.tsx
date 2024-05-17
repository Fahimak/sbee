import { forwardRef } from "react";

import TextField from "@app/shared/UI/TextField";
import styles from "../styles.module.css";

interface EditFormProps {
  projectName: string;
  onSubmit: () => void;
}

const EditForm = forwardRef<HTMLFormElement, EditFormProps>((props, ref) => {
  const { projectName, onSubmit } = props;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form className={styles.editFormField} onSubmit={handleSubmit} ref={ref}>
      <TextField
        defaultValue={projectName}
        inputSize="small"
        name="roomName"
        autoFocus
      />
    </form>
  );
});

EditForm.displayName = "EditForm";

export default EditForm;
