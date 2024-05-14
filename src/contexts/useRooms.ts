import { useEffect, useState } from "react";
import { ChatRooms } from "rooms-model";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getRooms,
  updateRoomName,
  UpdateRoomNameParams,
} from "@app/api/actions";

export interface useRoomsReturn {
  rooms: ChatRooms;
  updateRoomName: (body: UpdateRoomNameParams) => void;
}

export const useRooms = (): useRoomsReturn => {
  const queryClient = useQueryClient();
  const roomQuery = useQuery({ queryKey: ["rooms"], queryFn: getRooms });

  const updateRoomNameMutation = useMutation({
    mutationFn: updateRoomName,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });

  return {
    rooms: roomQuery.data || [],
    updateRoomName: updateRoomNameMutation.mutate,
  };
};
