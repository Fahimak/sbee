import { useContext } from "react";
import {
  RoomContext,
  QueryClientContext,
} from "@app/contexts/RoomsContextProvider";

export const useRoomsContext = () => useContext(RoomContext);
export const useQueryClientContext = () => useContext(QueryClientContext);
