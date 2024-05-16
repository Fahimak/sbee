import React, { createContext, useMemo } from "react";
import { useRooms, useRoomsReturn } from "@app/hooks/useRooms";

export const RoomContext = createContext<useRoomsReturn["rooms"]>([]);

export type RoomActionContextValue = Pick<
  useRoomsReturn,
  | "updateRoomName"
  | "createRoomMutation"
  | "addRoomDocument"
  | "addMessageInRoomMutation"
>;
export const RoomActionContext = createContext<RoomActionContextValue>(
  {} as RoomActionContextValue
);

const RoomsContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const {
    rooms,
    updateRoomName,
    createRoomMutation,
    addRoomDocument,
    addMessageInRoomMutation,
  } = useRooms();

  const roomsActionContextValue = useMemo<RoomActionContextValue>(
    () => ({
      updateRoomName,
      createRoomMutation,
      addRoomDocument,
      addMessageInRoomMutation,
    }),
    [
      updateRoomName,
      createRoomMutation,
      addRoomDocument,
      addMessageInRoomMutation,
    ]
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
