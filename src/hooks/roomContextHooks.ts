import { useContext } from "react";
import {
  RoomContext,
  RoomActionContext,
} from "@app/contexts/RoomsContextProvider";

export const useRoomsContext = () => useContext(RoomContext);

export const useRoomActionsContext = () => useContext(RoomActionContext);
