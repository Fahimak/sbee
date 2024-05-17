import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";

import type {
  AddMessageInChatRoomRequestData,
  ChatRooms,
  CreateRoomResponse,
} from "rooms-model";
import {
  getRooms,
  updateRoomName,
  createRoom,
  UpdateRoomNameParams,
  addDocumentByRoomUUID,
  AddDocumentByRoomUUID,
  addMessagesInChatRoom,
} from "@app/api/actions";
import { TEST_USER_ID } from "@app/api";
import { sortRooms } from "@app/utils";

export interface useRoomsReturn {
  rooms: ChatRooms;
  updateRoomName: UseMutationResult<
    boolean | undefined,
    Error,
    UpdateRoomNameParams,
    unknown
  >;
  createRoomMutation: UseMutationResult<
    CreateRoomResponse | undefined,
    Error,
    void,
    unknown
  >;
  addRoomDocument: UseMutationResult<
    boolean | undefined,
    Error,
    AddDocumentByRoomUUID,
    unknown
  >;
  addMessageInRoomMutation: UseMutationResult<
    string | undefined,
    Error,
    AddMessageInChatRoomRequestData,
    unknown
  >;
}

export const useRooms = (): useRoomsReturn => {
  const queryClient = useQueryClient();

  const roomQuery = useQuery({ queryKey: ["rooms"], queryFn: getRooms });

  const rooms = sortRooms(roomQuery.data || []);

  const createRoomMutation = useMutation({
    mutationFn: async () =>
      await createRoom({
        room_name: `Room ${new Date().getTime().toString(16)}`,
        user_id: TEST_USER_ID,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });

  const updateRoomNameMutation = useMutation({
    mutationFn: updateRoomName,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });

  const addRoomDocument = useMutation({
    mutationFn: addDocumentByRoomUUID,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });

  const addMessageInRoom = useMutation({
    mutationFn: addMessagesInChatRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

  return {
    rooms: rooms,
    updateRoomName: updateRoomNameMutation,
    createRoomMutation: createRoomMutation,
    addRoomDocument: addRoomDocument,
    addMessageInRoomMutation: addMessageInRoom,
  };
};
