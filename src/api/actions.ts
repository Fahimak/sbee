import clientApi from "@app/api";
import { UpdateRoomRequestData } from "rooms-model";

export const getRooms = async () => {
  try {
    const { data } = await clientApi.room.getRooms("993366");
    if (data.statusCode === 200 || data.statusCode === 201) {
      return data.data.chat_rooms;
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
