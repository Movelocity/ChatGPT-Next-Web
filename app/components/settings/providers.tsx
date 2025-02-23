import { List, ListItem, Select } from "../ui-lib";
import { useAccessStore } from "../../store";
import Locale from "../../locales";
import { ServiceProvider } from "../../constant";
import { ProviderConfig } from "../provider-config";
import { useState } from "react";

export function ProvidersSettings() {
  const accessStore = useAccessStore();
  const [showProviderConfig, setShowProviderConfig] = useState(false);

  return (
    <>
      <List>
        <ListItem
          title={Locale.Settings.Access.Provider.Title}
          subTitle={Locale.Settings.Access.Provider.SubTitle}
        >
          <Select
            value={accessStore.provider}
            onChange={(e) => {
              accessStore.update(
                (access) =>
                  (access.provider = e.target.value as ServiceProvider),
              );
            }}
          >
            {Object.entries(ServiceProvider).map(([k, v]) => (
              <option value={v} key={k}>
                {k}
              </option>
            ))}
          </Select>
        </ListItem>

        <ListItem
          title={Locale.Settings.Access.CustomEndpoint.Title}
          subTitle={Locale.Settings.Access.CustomEndpoint.SubTitle}
        >
          <input
            type="checkbox"
            checked={accessStore.useCustomConfig}
            onChange={(e) => {
              accessStore.update(
                (access) => (access.useCustomConfig = e.currentTarget.checked),
              );
            }}
          />
        </ListItem>
      </List>

      {showProviderConfig && (
        <ProviderConfig onClose={() => setShowProviderConfig(false)} />
      )}
    </>
  );
}
