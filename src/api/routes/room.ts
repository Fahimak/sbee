import type { AxiosInstance, AxiosPromise } from "axios";
import Base from "./base";
import {
  AddMessageInChatRoomRequestData,
  AddMessageInChatRoomResponse,
  ChatRoomsData,
  CreateRoomRequestData,
  CreateRoomResponse,
  GetRoomMessagesResponse,
  UpdateRoomRequestData,
} from "rooms-model";

export class RoomApi extends Base {
  getRooms(userId: string): AxiosPromise<CommonResponseApi<ChatRoomsData>> {
    return this.httpClient({
      url: `${this.url}/chat_room/user/${userId}`,
    });
  }

  createRoom(
    data: CreateRoomRequestData
  ): AxiosPromise<CommonResponseApi<CreateRoomResponse>> {
    return this.httpClient({
      url: `${this.url}/chat_room/create`,
      method: "POST",
      data,
    });
  }

  updateRoomName(
    roomUUID: string,
    data: UpdateRoomRequestData
  ): AxiosPromise<CommonResponseApi<boolean>> {
    return this.httpClient({
      url: `${this.url}/chat_room/update/${roomUUID}`,
      method: "POST",
      data,
    });
  }

  addDocument(
    roomUUID: string,
    data: FormData
  ): AxiosPromise<CommonResponseApi<boolean>> {
    return this.httpClient({
      url: `${this.url}/chat_room/add_document/${roomUUID}`,
      method: "POST",
      data,
    });
  }

  addMessageInChatRoom(
    data: AddMessageInChatRoomRequestData
  ): AxiosPromise<CommonResponseApi<AddMessageInChatRoomResponse>> {
    return this.httpClient({
      url: `${this.url}/chat_message/insert`,
      method: "POST",
      data,
    });
  }

  getChatRoomMessages(
    roomUUID: string
  ): AxiosPromise<CommonResponseApi<GetRoomMessagesResponse>> {
    return this.httpClient({
      url: `${this.url}/chat_message/room/${roomUUID}`,
      method: "GET",
    });
  }
}

export default function roomApi(httpClient: AxiosInstance) {
  return new RoomApi({
    url: "/summarizer",
    httpClient,
  });
}
