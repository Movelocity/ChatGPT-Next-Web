import { List, ListItem } from "../ui-lib";
import { IconButton } from "../button";
import { usePromptStore } from "../../store/prompt";
import { SearchService } from "../../store/prompt";
import Locale from "../../locales";
import { showToast } from "../ui-lib";
import EditIcon from "../../icons/edit.svg";
import AddIcon from "../../icons/add.svg";

export function PromptsSettings() {
  const promptStore = usePromptStore();
  const builtinCount = SearchService.builtinPrompts.length;
  const customCount = Object.keys(promptStore.prompts).length;

  return (
    <List>
      <ListItem
        title={Locale.Settings.Prompt.Disable.Title}
        subTitle={Locale.Settings.Prompt.Disable.SubTitle}
      >
        <input
          type="checkbox"
          checked={promptStore.disableAutoComplete}
          onChange={(e) => {
            promptStore.update(
              (prompt) =>
                (prompt.disableAutoComplete = e.currentTarget.checked),
            );
          }}
        />
      </ListItem>

      <ListItem
        title={Locale.Settings.Prompt.List}
        subTitle={Locale.Settings.Prompt.ListCount(builtinCount, customCount)}
      >
        <IconButton
          icon={<AddIcon />}
          text={Locale.UI.Create}
          onClick={() => showToast("Coming soon...")}
        />
        <IconButton
          icon={<EditIcon />}
          text={Locale.UI.Edit}
          onClick={() => showToast("Coming soon...")}
        />
      </ListItem>
    </List>
  );
}
