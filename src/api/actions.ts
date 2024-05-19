import clientApi from "@app/api";
import { AxiosProgressEvent } from "axios";
import type {
  AddMessageInChatRoomRequestData,
  UpdateRoomRequestData,
} from "rooms-model";

export const getRooms = async () => {
  try {
    const { data } = await clientApi.room.getRooms(clientApi.userId);
    if (data.statusCode === 200 || data.statusCode === 201) {
      return data.data.chat_rooms;
    }
    throw Error(data.responseInfo.message);
  } catch (error) {
    //TODO:
  }
};

export const createRoom = async () => {
  try {
    const { data } = await clientApi.room.createRoom({
      room_name: `Room ${new Date().getTime().toString(16)}`,
      user_id: clientApi.userId,
    });
    if (data.statusCode === 200 || data.statusCode === 201) {
      return data.data;
    }
    throw Error(data.responseInfo.message);
  } catch (error) {
    //TODO:
  }
};

export interface UpdateRoomNameParams extends UpdateRoomRequestData {
  roomUUID: string;
}

export const updateRoomName = async ({
  roomUUID,
  ...body
}: UpdateRoomNameParams) => {
  try {
    const { data } = await clientApi.room.updateRoomName(roomUUID, body);
    if (data.statusCode === 200 || data.statusCode === 201) {
      return data.data;
    }
    throw Error(data.responseInfo.message);
  } catch (error) {
    //TODO:
  }
};

export interface AddDocumentByRoomUUID {
  roomUUID: string;
  body: FormData;
  onUploadProgress?: (e: AxiosProgressEvent) => void;
  cancelSignal?: AbortSignal;
}

export const addDocumentByRoomUUID = async ({
  roomUUID,
  body,
  onUploadProgress,
  cancelSignal,
}: AddDocumentByRoomUUID) => {
  try {
    const { data } = await clientApi.room.addDocument(
      roomUUID,
      body,
      onUploadProgress,
      cancelSignal
    );
    if (data.statusCode === 200 || data.statusCode === 201) {
      return data.data;
    }
    throw Error(data.responseInfo.message);
  } catch (error) {
    //TODO:
  }
};

/**
 *
 * GET ROOM MESSAGES
 *
 */

export const getRoomMessages = async (roomUUID: string) => {
  try {
    const { data } = await clientApi.room.getChatRoomMessages(roomUUID);
    if (data.statusCode === 200 || data.statusCode === 201) {
      return data.data.messages;
    }
    throw Error(data.responseInfo.message);
  } catch (error) {
    //TODO:
  }
};

export const addMessagesInChatRoom = async (
  body: Pick<AddMessageInChatRoomRequestData, "message_content" | "room_uuid">
) => {
  try {
    const { data } = await clientApi.room.addMessageInChatRoom({
      ...body,
      sender_id: clientApi.userId,
    });
    if (data.statusCode === 200 || data.statusCode === 201) {
      return data.data.message_id;
    }
    throw Error(data.responseInfo.message);
  } catch (error) {
    //TODO:
  }
};
