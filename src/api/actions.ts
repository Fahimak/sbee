import clientApi, { TEST_USER_ID } from "@app/api";
import {
  AddMessageInChatRoomRequestData,
  CreateRoomRequestData,
  UpdateRoomRequestData,
} from "rooms-model";

export const getRooms = async () => {
  try {
    const { data } = await clientApi.room.getRooms(TEST_USER_ID);
    if (data.statusCode === 200 || data.statusCode === 201) {
      return data.data.chat_rooms;
    }
    throw Error(data.responseInfo.message);
  } catch (error) {
    //TODO:
  }
};

export const createRoom = async (body: CreateRoomRequestData) => {
  try {
    const { data } = await clientApi.room.createRoom(body);
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
}

export const addDocumentByRoomUUID = async ({
  roomUUID,
  body,
}: AddDocumentByRoomUUID) => {
  try {
    const { data } = await clientApi.room.addDocument(roomUUID, body);
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
  body: AddMessageInChatRoomRequestData
) => {
  try {
    const { data } = await clientApi.room.addMessageInChatRoom(body);
    if (data.statusCode === 200 || data.statusCode === 201) {
      return data.data.message_id;
    }
    throw Error(data.responseInfo.message);
  } catch (error) {
    //TODO:
  }
};
