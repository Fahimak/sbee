import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";

import type { ChatRooms } from "rooms-model";
import { getRooms, createRoom } from "@app/api/actions";
import { sortRooms } from "@app/utils";

export interface useRoomsReturn {
  queryClient: QueryClient;
  rooms: ChatRooms;
}

export const useRooms = (): useRoomsReturn => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const roomQuery = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });

  const isFetchedRooms = roomQuery.isFetched;

  const rooms = sortRooms(roomQuery.data || []);

  const createRoomMutation = useMutation({
    mutationFn: createRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });

  useEffect(() => {
    if (isFetchedRooms) {
      if (rooms.length) {
        const firstRoom = rooms.at(0);
        router.replace(`/${firstRoom?._id}`);
      } else {
        createRoomMutation.mutateAsync().then((res) => {
          if (res?.room_id) {
            router.replace(`/${res?.room_id}`);
          }
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchedRooms]);

  return {
    rooms,
    queryClient,
  };
};
