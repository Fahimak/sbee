import React, { createContext } from "react";
import { useRooms, useRoomsReturn } from "@app/hooks/useRooms";

export const RoomContext = createContext<useRoomsReturn["rooms"]>([]);

type QueryClientContextValue = useRoomsReturn["queryClient"];
export const QueryClientContext = createContext<QueryClientContextValue>(
  {} as QueryClientContextValue
);

const RoomsContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { rooms, queryClient } = useRooms();

  return (
    <QueryClientContext.Provider value={queryClient}>
      <RoomContext.Provider value={rooms}>{children}</RoomContext.Provider>
    </QueryClientContext.Provider>
  );
};

export default RoomsContextProvider;
