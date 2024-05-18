import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";

import ClickAwayListener from "@app/shared/UI/ClickAwayListener";
import TextField from "@app/shared/UI/TextField";
import { useQueryClientContext } from "@app/hooks/roomContextHooks";
import { updateRoomName } from "@app/api/actions";

import styles from "../styles.module.css";
import { useCallback } from "react";

interface EditFormProps {
  roomName: string;
  roomUUID: string;
  onSubmit: () => void;
}

const EditForm: React.FC<EditFormProps> = (props) => {
  const { roomName, onSubmit, roomUUID } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClientContext();

  const updateRoomNameMutation = useMutation({
    mutationFn: updateRoomName,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });

  const _updateRoomName = updateRoomNameMutation.mutateAsync;
  const isPending = updateRoomNameMutation.isPending;

  const updateRoom = useCallback(async () => {
    const value = (inputRef?.current?.value || "").trim();
    if (value && value !== roomName) {
      await _updateRoomName({
        room_name: value,
        roomUUID: roomUUID,
      });
      onSubmit();
    }
  }, [_updateRoomName, roomName, roomUUID, onSubmit]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    updateRoom();
  };

  return (
    <ClickAwayListener onClickAway={onSubmit}>
      <form className={styles.editFormField} onSubmit={handleSubmit}>
        <TextField
          defaultValue={roomName}
          inputSize="small"
          name="roomName"
          autoFocus
          disabled={isPending}
          ref={inputRef}
        />
      </form>
    </ClickAwayListener>
  );
};

export default EditForm;
