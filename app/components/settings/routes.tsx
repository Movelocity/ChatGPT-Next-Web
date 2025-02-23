import { Path } from "../../constant";
import { SettingsLayout } from "./layout";
import { GeneralSettings } from "./general";
import { AppearanceSettings } from "./appearance";

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
      // 其他子路由将在后续添加
    ],
  },
];
