import { MyRequest } from "./../request";

export interface Folder {
  id: string;
  name: string;
  isOpen: boolean;
  requests: MyRequest[];
}

export interface FoldersState {
  folders: Folder[];
}
