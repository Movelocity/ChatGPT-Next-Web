import { CN_MASKS } from "./cn";
import { TW_MASKS } from "./tw";
import { EN_MASKS } from "./en";
import { BuiltinMask } from "./typing";

export const loadBuiltinMasks = (): Record<string, BuiltinMask[]> => {
  return {
    cn: CN_MASKS,
    tw: TW_MASKS,
    en: EN_MASKS,
  };
};
