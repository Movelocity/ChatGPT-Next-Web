import { List, ListItem, Select } from "../ui-lib";
import { useAppConfig, Theme } from "../../store";
import Locale, {
  AllLangs,
  ALL_LANG_OPTIONS,
  changeLang,
  getLang,
} from "../../locales";
import { InputRange } from "../input-range";

export function AppearanceSettings() {
  const config = useAppConfig();
  const updateConfig = config.update;

  return (
    <List>
      <ListItem title={Locale.Settings.Theme}>
        <Select
          value={config.theme}
          onChange={(e) => {
            updateConfig((config) => (config.theme = e.target.value as Theme));
          }}
        >
          {Object.values(Theme).map((v) => (
            <option value={v} key={v}>
              {v}
            </option>
          ))}
        </Select>
      </ListItem>

      <ListItem title={Locale.Settings.Lang.Name}>
        <Select
          value={getLang()}
          onChange={(e) => {
            changeLang(e.target.value as any);
          }}
        >
          {AllLangs.map((lang) => (
            <option value={lang} key={lang}>
              {ALL_LANG_OPTIONS[lang]}
            </option>
          ))}
        </Select>
      </ListItem>

      <ListItem
        title={Locale.Settings.FontSize.Title}
        subTitle={Locale.Settings.FontSize.SubTitle}
      >
        <InputRange
          title={`${config.fontSize ?? 14}px`}
          value={config.fontSize}
          min="12"
          max="40"
          step="1"
          onChange={(e) =>
            updateConfig(
              (config) =>
                (config.fontSize = Number.parseInt(e.currentTarget.value)),
            )
          }
          aria={Locale.Settings.FontSize.Title}
        />
      </ListItem>

      <ListItem
        title={Locale.Settings.FontFamily.Title}
        subTitle={Locale.Settings.FontFamily.SubTitle}
      >
        <input
          type="text"
          value={config.fontFamily}
          placeholder={Locale.Settings.FontFamily.Placeholder}
          onChange={(e) =>
            updateConfig(
              (config) => (config.fontFamily = e.currentTarget.value),
            )
          }
        />
      </ListItem>
    </List>
  );
}
