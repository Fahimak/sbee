import { ChatRooms } from "rooms-model";

export const sortRooms = (rooms: ChatRooms): ChatRooms => {
  if (!rooms || !rooms.length) return rooms;
  return [...rooms].sort((a, b) => {
    if (a.date_modified === b.date_modified) {
      return 0;
    }

    return new Date(a.date_modified).getTime() >
      new Date(b.date_modified).getTime()
      ? -1
      : 1;
  });
};
