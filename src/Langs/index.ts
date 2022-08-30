import { LangENG } from "./ENG";
import { LangVN } from "./VN";

export type ILangs = LangVN | LangENG | undefined;

export enum ELangs {
  Eng = 1,
  Vn = 2,
}
