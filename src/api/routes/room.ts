import type { AxiosInstance, AxiosPromise } from "axios";
import Base from "./base";
import { ChatRoomsData, UpdateRoomRequestData } from "rooms-model";

export class RoomApi extends Base {
  getRooms(userId: string): AxiosPromise<CommonResponseApi<ChatRoomsData>> {
    return this.httpClient({
      url: `${this.url}/user/${userId}`,
    });
  }

  updateRoomName(
    roomUUID: string,
    data: UpdateRoomRequestData
  ): AxiosPromise<CommonResponseApi<boolean>> {
    return this.httpClient({
      url: `${this.url}/update/${roomUUID}`,
      method: "POST",
      data,
    });
  }
}

export default function roomApi(httpClient: AxiosInstance) {
  return new RoomApi({
    url: "/chat_room",
    httpClient,
  });
}
