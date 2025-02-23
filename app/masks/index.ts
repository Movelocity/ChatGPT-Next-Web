import { Mask } from "../store/mask";
import { type BuiltinMask } from "./typing";
import { loadBuiltinMasks } from "./loader";

export { type BuiltinMask } from "./typing";

export const BUILTIN_MASK_ID = 100000;

export const BUILTIN_MASK_STORE = {
  buildinId: BUILTIN_MASK_ID,
  masks: {} as Record<string, BuiltinMask>,
  get(id?: string) {
    if (!id) return undefined;
    return this.masks[id] as Mask | undefined;
  },
  add(m: BuiltinMask) {
    const mask = { ...m, id: this.buildinId++, builtin: true };
    this.masks[mask.id] = mask;
    return mask;
  },
};

export const BUILTIN_MASKS: BuiltinMask[] = [];

if (typeof window != "undefined") {
  // Load masks at runtime
  const masks = loadBuiltinMasks();
  const { cn = [], tw = [], en = [] } = masks;
  [...cn, ...tw, ...en].forEach((m) => {
    BUILTIN_MASKS.push(BUILTIN_MASK_STORE.add(m));
  });
}
