import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { updateRoomName } from "@app/api/actions";
import ClickAwayListener from "@app/shared/UI/ClickAwayListener";
import TextField from "@app/shared/UI/TextField";
import { useQueryClientContext } from "@app/hooks/roomContextHooks";

import styles from "../styles.module.css";

interface EditFormProps {
  roomName: string;
  currentRoomName: string;
  roomUUID: string;
  onSubmit: () => void;
  onChangeRoomName: (value: string) => void;
}

const EditForm: React.FC<EditFormProps> = (props) => {
  const { roomName, onSubmit, roomUUID, onChangeRoomName, currentRoomName } =
    props;

  const queryClient = useQueryClientContext();

  const updateRoomNameMutation = useMutation({
    mutationFn: updateRoomName,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });

  const _updateRoomName = updateRoomNameMutation.mutateAsync;
  const isPending = updateRoomNameMutation.isPending;

  const handleChangeRoomName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof onChangeRoomName === "function") {
      const value = event.currentTarget.value;
      onChangeRoomName(value);
    }
  };

  const updateRoom = useCallback(async () => {
    const value = roomName.trim();
    if (value && value !== currentRoomName) {
      await _updateRoomName({
        room_name: value,
        roomUUID: roomUUID,
      });
      onSubmit();
    }
  }, [_updateRoomName, currentRoomName, onSubmit, roomName, roomUUID]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    updateRoom();
  };

  return (
    <ClickAwayListener onClickAway={onSubmit}>
      <form className={styles.editFormField} onSubmit={handleSubmit}>
        <TextField
          value={roomName}
          onChange={handleChangeRoomName}
          inputSize="small"
          name="roomName"
          autoFocus
          disabled={isPending}
        />
      </form>
    </ClickAwayListener>
  );
};

export default EditForm;
