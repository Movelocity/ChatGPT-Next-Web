import { useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { IconButton } from "../button";
import { Path } from "../../constant";
import { ErrorBoundary } from "../error";
import CloseIcon from "../../icons/close.svg";
import styles from "../settings.module.scss";
import Locale from "../../locales";

export function SettingsLayout() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("general");

  const tabs = [
    {
      path: "/settings/general",
      name: "General",
      title: Locale.Settings.General.Title,
    },
    {
      path: "/settings/appearance",
      name: "Appearance",
      title: Locale.Settings.Appearance.Title,
    },
    {
      path: "/settings/providers",
      name: "Providers",
      title: Locale.Settings.Providers.Title,
    },
    {
      path: "/settings/sync",
      name: "Sync",
      title: Locale.Settings.Sync.Title,
    },
    {
      path: "/settings/prompts",
      name: "Prompts",
      title: Locale.Settings.Prompts.Title,
    },
    {
      path: "/settings/advanced",
      name: "Advanced",
      title: Locale.Settings.Advanced.Title,
    },
  ];

  return (
    <ErrorBoundary>
      <div className="window-header" data-tauri-drag-region>
        <div className="window-header-title">
          <div className="window-header-main-title">
            {Locale.Settings.Title}
          </div>
          <div className="window-header-sub-title">
            {Locale.Settings.SubTitle}
          </div>
        </div>
        <div className="window-actions">
          <div className="window-action-button"></div>
          <div className="window-action-button"></div>
          <div className="window-action-button">
            <IconButton
              icon={<CloseIcon />}
              onClick={() => navigate(Path.Home)}
              bordered
              title={Locale.UI.Close}
            />
          </div>
        </div>
      </div>
      <div className={styles["settings-page"]}>
        <div className={styles["settings-sidebar"]}>
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`${styles["sidebar-item"]} ${
                selectedTab === tab.name.toLowerCase()
                  ? styles["sidebar-item-active"]
                  : ""
              }`}
              onClick={() => setSelectedTab(tab.name.toLowerCase())}
            >
              {tab.title}
            </Link>
          ))}
        </div>
        <div className={styles["settings-content"]}>
          <Outlet />
        </div>
      </div>
    </ErrorBoundary>
  );
}
