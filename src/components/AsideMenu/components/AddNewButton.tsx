import Button from "@app/shared/UI/Button";
import NewIcon from "@app/shared/SvgIcons/NewIcon";
import styles from "@app/components/AsideMenu/styles.module.css";

const AddNewButton = () => {
  const handleClickCreate = () => {
    // createRoom();
  };

  return (
    <Button
      className={styles.createNewButton}
      variant="contained"
      onClick={handleClickCreate}
    >
      Create new
      <NewIcon />
    </Button>
  );
};

export default AddNewButton;
