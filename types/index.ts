import { ChatStateProps } from "./chat";

export type KeyedObject = {
  [key: string]: string | number | KeyedObject | any;
};

export interface ColorProps {
  readonly [key: string]: string;
}

export interface DefaultRootStateProps {
  chat: ChatStateProps;
}