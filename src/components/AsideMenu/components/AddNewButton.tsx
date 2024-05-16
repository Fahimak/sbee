import Button from "@app/shared/UI/Button";
import NewIcon from "@app/shared/SvgIcons/NewIcon";
import styles from "@app/components/AsideMenu/styles.module.css";
import { useRoomActionsContext } from "@app/hooks/roomContextHooks";
import { useRouter } from "next/router";

const AddNewButton = () => {
  const router = useRouter();

  const { createRoomMutation } = useRoomActionsContext();

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
