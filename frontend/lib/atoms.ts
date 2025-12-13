import { ModalPayload } from "@/types/modal";
import { atom } from "jotai";

export const refreshAtom = atom(true);

export const loaderAtom = atom(false);

export const globalModalAtom = atom<ModalPayload>({
  type: null,
});
