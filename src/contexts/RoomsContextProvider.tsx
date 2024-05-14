import React, { createContext, useMemo } from "react";
import { useRooms, useRoomsReturn } from "./useRooms";

export const RoomContext = createContext<useRoomsReturn["rooms"]>([]);

export type RoomActionContextValue = Pick<useRoomsReturn, "updateRoomName">;
export const RoomActionContext = createContext<RoomActionContextValue>(
  {} as RoomActionContextValue
);

const RoomsContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { rooms, updateRoomName } = useRooms();

  const roomsActionContextValue = useMemo<RoomActionContextValue>(
    () => ({ updateRoomName }),
    [updateRoomName]
  );

  return (
    <RoomContext.Provider value={rooms}>
      <RoomActionContext.Provider value={roomsActionContextValue}>
        {children}
      </RoomActionContext.Provider>
    </RoomContext.Provider>
  );
};

export default RoomsContextProvider;
