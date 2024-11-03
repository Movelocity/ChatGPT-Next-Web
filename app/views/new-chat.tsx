import { useEffect, useRef, useState } from "react";
import { Path } from "../constant";
import { IconButton } from "@/app/components/button";
// import { EmojiAvatar } from "@/app/components/emoji";
import styles from "@/app/scss/new-chat.module.scss";

import { LeftIcon, LightningIcon, EyeIcon } from "@/app/icons";

import { useLocation, useNavigate } from "react-router-dom";
import { Mask, useMaskStore } from "../store/mask";
import Locale from "../locales";
import { useAppConfig, useChatStore } from "../store";
import MaskAvatar from "@/app/components/mask/MaskAvatar";
import { useCommand } from "../command";
import { showConfirm } from "@/app/components/ui-lib";
import { BUILTIN_MASK_STORE } from "../masks";

function MaskItem(props: { mask: Mask; onClick?: () => void }) {
  const context = props.mask.context;
  const [desc, setDesc] = useState("");
  useEffect(() => {
    if (context.length > 0 && desc === "") {
      setDesc(context[context.length - 1].content.toString().substring(0, 30));
    }
  }, [context]);

  return (
    <div className={styles["mask"]} onClick={props.onClick}>
      <div className={styles["mask-head"]}>
        <MaskAvatar
          avatar={props.mask.avatar}
          model={props.mask.modelConfig.model}
        />
        <div className={styles["mask-name"] + " one-line"}>
          {props.mask.name}
        </div>
      </div>
      <span className={styles["mask-desc"]}>{desc}</span>
    </div>
  );
}

export function NewChat() {
  const chatStore = useChatStore();
  const maskStore = useMaskStore();

  const masks = maskStore.getAll();

  // const groups = useMaskGroup(masks);

  const navigate = useNavigate();
  const config = useAppConfig();

  const maskRef = useRef<HTMLDivElement>(null);

  const { state } = useLocation();

  const startChat = (mask?: Mask) => {
    setTimeout(() => {
      chatStore.newSession(mask);
      navigate(Path.Chat);
    }, 10);
  };

  useCommand({
    mask: (id) => {
      try {
        const mask = maskStore.get(id) ?? BUILTIN_MASK_STORE.get(id);
        startChat(mask ?? undefined);
      } catch {
        console.error("[New Chat] failed to create chat from mask id=", id);
      }
    },
  });

  // useEffect(() => {
  //   if (maskRef.current) {
  //     maskRef.current.scrollLeft =
  //       (maskRef.current.scrollWidth - maskRef.current.clientWidth) / 2;
  //   }
  // }, [groups]);

  return (
    <div className={styles["new-chat"]}>
      <div className={styles["mask-header"]}>
        <span className={styles["row"]}>
          <IconButton
            icon={<LeftIcon />}
            text={Locale.NewChat.Return}
            onClick={() => navigate(Path.Home)}
          ></IconButton>
          <IconButton
            text={Locale.NewChat.More}
            onClick={() => navigate(Path.Masks)}
            icon={<EyeIcon />}
            shadow
          />
        </span>
        {!state?.fromHome && (
          <IconButton
            text={Locale.NewChat.NotShow}
            onClick={async () => {
              if (await showConfirm(Locale.NewChat.ConfirmNoShow)) {
                startChat();
                config.update(
                  (config) => (config.dontShowMaskSplashScreen = true),
                );
              }
            }}
          ></IconButton>
        )}
      </div>

      {/* <div className={styles["mask-cards"]}>
        <div className={styles["mask-card"]}>
          <EmojiAvatar avatar="1f606" size={24} />
        </div>
        <div className={styles["mask-card"]}>
          <EmojiAvatar avatar="1f916" size={24} />
        </div>
        <div className={styles["mask-card"]}>
          <EmojiAvatar avatar="1f479" size={24} />
        </div>
      </div>*/}

      <div className={styles["title"]}>{Locale.NewChat.Title}</div>
      <div className={styles["sub-title"]}>{Locale.NewChat.SubTitle}</div>

      <div className={styles["masks"]} ref={maskRef}>
        <div className={styles["white-mask"]} onClick={() => startChat()}>
          <LightningIcon />
          <div className={styles["mask-name"] + " one-line"}>
            {Locale.NewChat.Skip}
          </div>
        </div>

        {/* <IconButton
          text={Locale.NewChat.Skip}
          onClick={() => startChat()}
          icon={<LightningIcon />}
          type="primary"
          shadow
          // style={{height: "1.6em", width: "8em"}}
          className={styles["mask"]}
        /> */}
        {masks.map((mask, index) => (
          <MaskItem key={index} mask={mask} onClick={() => startChat(mask)} />
        ))}
        {/* {groups.map((masks, i) => (
          <div key={i} className={styles["mask-row"]}>
            {masks.map((mask, index) => (
              <MaskItem
                key={index}
                mask={mask}
                onClick={() => startChat(mask)}
              />
            ))}
          </div>
        ))} */}
      </div>
    </div>
  );
}
