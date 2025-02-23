import { List, ListItem, IconButton } from "../ui-lib";
import { useSyncStore } from "../../store/sync";
import { useChatStore } from "../../store";
import { usePromptStore } from "../../store/prompt";
import { useMaskStore } from "../../store/mask";
import { showToast } from "../ui-lib";
import Locale from "../../locales";
import { useState } from "react";
import { SyncConfigModal } from "./sync-config";

import ResetIcon from "../../icons/reload.svg";
import ConfigIcon from "../../icons/config.svg";
import UploadIcon from "../../icons/upload.svg";
import DownloadIcon from "../../icons/download.svg";

export function SyncSettings() {
  const syncStore = useSyncStore();
  const chatStore = useChatStore();
  const promptStore = usePromptStore();
  const maskStore = useMaskStore();
  const [showSyncConfigModal, setShowSyncConfigModal] = useState(false);

  const stateOverview = {
    chat: chatStore.sessions.length,
    message: chatStore.sessions.reduce((p, c) => p + c.messages.length, 0),
    prompt: Object.keys(promptStore.prompts).length,
    mask: Object.keys(maskStore.masks).length,
  };

  return (
    <>
      <List>
        <ListItem
          title={Locale.Settings.Sync.CloudState}
          subTitle={
            syncStore.lastProvider
              ? `${new Date(syncStore.lastSyncTime).toLocaleString()} [${
                  syncStore.lastProvider
                }]`
              : Locale.Settings.Sync.NotSyncYet
          }
        >
          <div style={{ display: "flex" }}>
            <IconButton
              icon={<ConfigIcon />}
              text={Locale.UI.Config}
              onClick={() => {
                setShowSyncConfigModal(true);
              }}
            />
            <IconButton
              icon={<ResetIcon />}
              text={Locale.UI.Sync}
              onClick={async () => {
                try {
                  await syncStore.sync();
                  showToast(Locale.Settings.Sync.Success);
                } catch (e) {
                  showToast(Locale.Settings.Sync.Fail);
                  console.error("[Sync]", e);
                }
              }}
            />
          </div>
        </ListItem>

        <ListItem
          title={Locale.Settings.Sync.LocalState}
          subTitle={Locale.Settings.Sync.Overview(stateOverview)}
        >
          <div style={{ display: "flex" }}>
            <IconButton
              icon={<UploadIcon />}
              text={Locale.UI.Export}
              onClick={() => {
                syncStore.export();
              }}
            />
            <IconButton
              icon={<DownloadIcon />}
              text={Locale.UI.Import}
              onClick={() => {
                syncStore.import();
              }}
            />
          </div>
        </ListItem>
      </List>

      {showSyncConfigModal && (
        <SyncConfigModal onClose={() => setShowSyncConfigModal(false)} />
      )}
    </>
  );
}
