import { List, ListItem } from "../ui-lib";
import { IconButton } from "../button";
import { useAppConfig } from "../../store";
import { useChatStore } from "../../store";
import Locale from "../../locales";
import { showConfirm } from "../ui-lib";

export function AdvancedSettings() {
  const config = useAppConfig();
  const chatStore = useChatStore();

  return (
    <List>
      <ListItem
        title={Locale.Settings.InjectSystemPrompts.Title}
        subTitle={Locale.Settings.InjectSystemPrompts.SubTitle}
      >
        <input
          type="checkbox"
          checked={config.modelConfig.enableInjectSystemPrompts}
          onChange={(e) =>
            config.update(
              (config) =>
                (config.modelConfig.enableInjectSystemPrompts =
                  e.currentTarget.checked),
            )
          }
        />
      </ListItem>

      <ListItem
        title={Locale.Settings.InputTemplate.Title}
        subTitle={Locale.Settings.InputTemplate.SubTitle}
      >
        <input
          type="text"
          value={config.modelConfig.template}
          onChange={(e) =>
            config.update(
              (config) => (config.modelConfig.template = e.currentTarget.value),
            )
          }
        />
      </ListItem>

      <ListItem
        title={Locale.Settings.Danger.Reset.Title}
        subTitle={Locale.Settings.Danger.Reset.SubTitle}
      >
        <IconButton
          text={Locale.Settings.Danger.Reset.Action}
          onClick={async () => {
            if (await showConfirm(Locale.Settings.Danger.Reset.Confirm)) {
              config.reset();
            }
          }}
          type="danger"
        />
      </ListItem>

      <ListItem
        title={Locale.Settings.Danger.Clear.Title}
        subTitle={Locale.Settings.Danger.Clear.SubTitle}
      >
        <IconButton
          text={Locale.Settings.Danger.Clear.Action}
          onClick={async () => {
            if (await showConfirm(Locale.Settings.Danger.Clear.Confirm)) {
              chatStore.clearAllData();
            }
          }}
          type="danger"
        />
      </ListItem>
    </List>
  );
}
