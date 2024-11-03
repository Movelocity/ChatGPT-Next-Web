import { DEFAULT_MASK_AVATAR } from "@/app/store/mask";
import { ModelType } from "@/app/store";
import { Avatar } from "@/app/components/emoji";

export default function MaskAvatar(props: {
  avatar: string;
  model?: ModelType;
}) {
  return props.avatar !== DEFAULT_MASK_AVATAR ? (
    <Avatar avatar={props.avatar} />
  ) : (
    <Avatar model={props.model} />
  );
}
