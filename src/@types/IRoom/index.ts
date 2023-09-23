export interface RoomsInterface {
  key: string;
  roomName: string;
  status: boolean;
}

//model
export interface ListRoomModelInterface {
  reset: boolean;
  HandleClickAddRoom: () => void;
  HandleClickDescription: (id: string) => void;
  HandleClickUpdate: (id: string) => void;
}
export interface UpdateModelRoomInterface {
  id: string;
  HandleClickCancelUpdateDevice: () => void;
  HandleClickOkUpdateDevice: (roomId: string, roomName: string, status: string) => void;
}
