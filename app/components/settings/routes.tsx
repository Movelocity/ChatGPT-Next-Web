import { Path } from "../../constant";
import { SettingsLayout } from "./layout";
import { GeneralSettings } from "./general";
import { AppearanceSettings } from "./appearance";
import { ProvidersSettings } from "./providers";
import { AdvancedSettings } from "./advanced";
import { SyncSettings } from "./sync";
import { PromptsSettings } from "./prompts";

export const settingsRoutes = [
  {
    path: Path.Settings,
    element: <SettingsLayout />,
    children: [
      {
        path: Path.SettingsGeneral,
        element: <GeneralSettings />,
      },
      {
        path: Path.SettingsAppearance,
        element: <AppearanceSettings />,
      },
      {
        path: Path.SettingsProviders,
        element: <ProvidersSettings />,
      },
      {
        path: Path.SettingsSync,
        element: <SyncSettings />,
      },
      {
        path: Path.SettingsPrompts,
        element: <PromptsSettings />,
      },
      {
        path: Path.SettingsAdvanced,
        element: <AdvancedSettings />,
      },
    ],
  },
];
