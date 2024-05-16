import PreviousProjectItem from "./PreviousProjectItem";
import styles from "../styles.module.css";
import { useRoomsContext } from "@app/hooks/roomContextHooks";

const PreviousProjectsSection = () => {
  const rooms = useRoomsContext();
  return (
    <div className={styles.previousSectionContainer}>
      <p className={styles.previousSectionTitle}>Previous</p>
      <ul className={styles.previousSectionListContainer}>
        {rooms.map((item) => {
          return (
            <PreviousProjectItem
              key={item._id}
              roomName={item.room_name || ""}
              roomUUID={item.room_uuid}
              roomId={item._id}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default PreviousProjectsSection;
