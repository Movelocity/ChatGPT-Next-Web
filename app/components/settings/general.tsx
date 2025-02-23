import { List, ListItem, Select } from "../ui-lib";
import { useAppConfig, SubmitKey } from "../../store";
import Locale from "../../locales";
import { Avatar, AvatarPicker } from "../emoji";
import { useState } from "react";
import { Popover } from "../ui-lib";

export function GeneralSettings() {
  const config = useAppConfig();
  const updateConfig = config.update;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  return (
    <List>
      <ListItem title={Locale.Settings.Avatar}>
        <Popover
          onClose={() => setShowEmojiPicker(false)}
          content={
            <AvatarPicker
              onEmojiClick={(avatar: string) => {
                updateConfig((config) => (config.avatar = avatar));
                setShowEmojiPicker(false);
              }}
            />
          }
          open={showEmojiPicker}
        >
          <div
            className="avatar"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <Avatar avatar={config.avatar} />
          </div>
        </Popover>
      </ListItem>

      <ListItem title={Locale.Settings.SendKey}>
        <Select
          value={config.submitKey}
          onChange={(e) => {
            updateConfig(
              (config) => (config.submitKey = e.target.value as SubmitKey),
            );
          }}
        >
          {Object.values(SubmitKey).map((v) => (
            <option value={v} key={v}>
              {v}
            </option>
          ))}
        </Select>
      </ListItem>

      <ListItem
        title={Locale.Settings.SendPreviewBubble.Title}
        subTitle={Locale.Settings.SendPreviewBubble.SubTitle}
      >
        <input
          type="checkbox"
          checked={config.sendPreviewBubble}
          onChange={(e) =>
            updateConfig(
              (config) => (config.sendPreviewBubble = e.currentTarget.checked),
            )
          }
        />
      </ListItem>
    </List>
  );
}
