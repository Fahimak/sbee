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
    documents: Documents;
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

  export type CreateRoomRequestData = {
    room_name: string;
    user_id: string;
  };

  export type Documents = DocumentItem[];

  export interface DocumentItem {
    keywords: string[];
    sections: Section[];
    summary: string;
    title: string;
    url: string;
  }

  export interface Section {
    description: string;
    title: string;
  }

  export interface AddMessageInChatRoomRequestData {
    room_uuid: string;
    sender_id: string;
    message_content: string;
  }

  export interface AddMessageInChatRoomResponse {
    message_id: string;
  }

  export interface GetRoomMessagesResponse {
    messages: MessagesList;
  }

  export type MessagesList = Message[];

  export interface Message {
    message_id: string;
    room_uuid: string;
    sender_id: string;
    message_content: string;
    timestamp: string;
    intent: string;
    message_response: string;
  }
}
