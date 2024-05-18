import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";

import Button from "@app/shared/UI/Button";
import NewIcon from "@app/shared/SvgIcons/NewIcon";
import styles from "@app/components/AsideMenu/styles.module.css";
import { useQueryClientContext } from "@app/hooks/roomContextHooks";
import { createRoom } from "@app/api/actions";

const AddNewButton = () => {
  const router = useRouter();
  const queryClient = useQueryClientContext();

  const createRoomMutation = useMutation({
    mutationFn: createRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });

  const handleClickCreate = () => {
    createRoomMutation.mutateAsync().then((res) => {
      if (res?.room_id) {
        router.push(`/${res?.room_id}`);
      }
    });
  };

  return (
    <Button
      className={styles.createNewButton}
      variant="contained"
      onClick={handleClickCreate}
      disabled={createRoomMutation.isPending}
    >
      Create new
      <NewIcon />
    </Button>
  );
};

export default AddNewButton;
