declare module "rooms-model" {
  export interface ChatRoomsData {
    chat_rooms: ChatRooms;
  }

  export type ChatRooms = ChatRoom[];

  export interface ChatRoom {
    _id: string;
    created_by: string;
    date_created: string;
    date_modified: string;
    documents: any[];
    last_modified_by: string;
    room_description: any;
    room_id: any;
    room_members: any[];
    room_name: string;
    room_uuid: string;
    user_id: string;
  }

  export type CreateRoomResponse = {
    room_id: string;
  };

  export type UpdateRoomRequestData = {
    room_name: string;
  };
}
