import { useState } from "react";
import { List, ListItem, Modal, PasswordInput, Select } from "./ui-lib";
import { IconButton } from "./button";
import CloseIcon from "../icons/close.svg";
import { useProviderStore } from "../store/provider";
import { ServiceProvider } from "../constant";

export function ProviderConfig(props: { onClose?: () => void }) {
  const providerStore = useProviderStore();
  const [provider, setProvider] = useState<ServiceProvider>(
    ServiceProvider.OpenAI,
  );

  const renderProviderConfig = () => {
    switch (provider) {
      case ServiceProvider.OpenAI:
        return (
          <>
            <ListItem
              title="OpenAI API Endpoint"
              subTitle="Custom endpoint for OpenAI API"
            >
              <input
                type="text"
                value={providerStore.openaiUrl}
                onChange={(e) =>
                  providerStore.update(
                    (config) => (config.openaiUrl = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
            <ListItem title="OpenAI API Key" subTitle="Your OpenAI API key">
              <PasswordInput
                value={providerStore.openaiApiKey}
                onChange={(e) =>
                  providerStore.update(
                    (config) => (config.openaiApiKey = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
          </>
        );

      case ServiceProvider.Azure:
        return (
          <>
            <ListItem title="Azure Endpoint" subTitle="Your Azure API endpoint">
              <input
                type="text"
                value={providerStore.azureUrl}
                onChange={(e) =>
                  providerStore.update(
                    (config) => (config.azureUrl = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
            <ListItem title="Azure API Key" subTitle="Your Azure API key">
              <PasswordInput
                value={providerStore.azureApiKey}
                onChange={(e) =>
                  providerStore.update(
                    (config) => (config.azureApiKey = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
            <ListItem title="API Version" subTitle="Azure API version">
              <input
                type="text"
                value={providerStore.azureApiVersion}
                onChange={(e) =>
                  providerStore.update(
                    (config) =>
                      (config.azureApiVersion = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
          </>
        );

      case ServiceProvider.Google:
        return (
          <>
            <ListItem
              title="Google API Endpoint"
              subTitle="Your Google API endpoint"
            >
              <input
                type="text"
                value={providerStore.googleUrl}
                onChange={(e) =>
                  providerStore.update(
                    (config) => (config.googleUrl = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
            <ListItem title="Google API Key" subTitle="Your Google API key">
              <PasswordInput
                value={providerStore.googleApiKey}
                onChange={(e) =>
                  providerStore.update(
                    (config) => (config.googleApiKey = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
            <ListItem title="API Version" subTitle="Google API version">
              <input
                type="text"
                value={providerStore.googleApiVersion}
                onChange={(e) =>
                  providerStore.update(
                    (config) =>
                      (config.googleApiVersion = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
          </>
        );

      case ServiceProvider.Anthropic:
        return (
          <>
            <ListItem
              title="Anthropic API Endpoint"
              subTitle="Your Anthropic API endpoint"
            >
              <input
                type="text"
                value={providerStore.anthropicUrl}
                onChange={(e) =>
                  providerStore.update(
                    (config) => (config.anthropicUrl = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
            <ListItem
              title="Anthropic API Key"
              subTitle="Your Anthropic API key"
            >
              <PasswordInput
                value={providerStore.anthropicApiKey}
                onChange={(e) =>
                  providerStore.update(
                    (config) =>
                      (config.anthropicApiKey = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
            <ListItem title="API Version" subTitle="Anthropic API version">
              <input
                type="text"
                value={providerStore.anthropicApiVersion}
                onChange={(e) =>
                  providerStore.update(
                    (config) =>
                      (config.anthropicApiVersion = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
          </>
        );

      case ServiceProvider.Baidu:
        return (
          <>
            <ListItem
              title="Baidu API Endpoint"
              subTitle="Your Baidu API endpoint"
            >
              <input
                type="text"
                value={providerStore.baiduUrl}
                onChange={(e) =>
                  providerStore.update(
                    (config) => (config.baiduUrl = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
            <ListItem title="Baidu API Key" subTitle="Your Baidu API key">
              <PasswordInput
                value={providerStore.baiduApiKey}
                onChange={(e) =>
                  providerStore.update(
                    (config) => (config.baiduApiKey = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
            <ListItem title="Secret Key" subTitle="Your Baidu secret key">
              <PasswordInput
                value={providerStore.baiduSecretKey}
                onChange={(e) =>
                  providerStore.update(
                    (config) => (config.baiduSecretKey = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
          </>
        );

      case ServiceProvider.ByteDance:
        return (
          <>
            <ListItem
              title="ByteDance API Endpoint"
              subTitle="Your ByteDance API endpoint"
            >
              <input
                type="text"
                value={providerStore.bytedanceUrl}
                onChange={(e) =>
                  providerStore.update(
                    (config) => (config.bytedanceUrl = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
            <ListItem
              title="ByteDance API Key"
              subTitle="Your ByteDance API key"
            >
              <PasswordInput
                value={providerStore.bytedanceApiKey}
                onChange={(e) =>
                  providerStore.update(
                    (config) =>
                      (config.bytedanceApiKey = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
          </>
        );

      case ServiceProvider.Alibaba:
        return (
          <>
            <ListItem
              title="Alibaba API Endpoint"
              subTitle="Your Alibaba API endpoint"
            >
              <input
                type="text"
                value={providerStore.alibabaUrl}
                onChange={(e) =>
                  providerStore.update(
                    (config) => (config.alibabaUrl = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
            <ListItem title="Alibaba API Key" subTitle="Your Alibaba API key">
              <PasswordInput
                value={providerStore.alibabaApiKey}
                onChange={(e) =>
                  providerStore.update(
                    (config) => (config.alibabaApiKey = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
          </>
        );

      case ServiceProvider.Moonshot:
        return (
          <>
            <ListItem
              title="Moonshot API Endpoint"
              subTitle="Your Moonshot API endpoint"
            >
              <input
                type="text"
                value={providerStore.moonshotUrl}
                onChange={(e) =>
                  providerStore.update(
                    (config) => (config.moonshotUrl = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
            <ListItem title="Moonshot API Key" subTitle="Your Moonshot API key">
              <PasswordInput
                value={providerStore.moonshotApiKey}
                onChange={(e) =>
                  providerStore.update(
                    (config) => (config.moonshotApiKey = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
          </>
        );

      case ServiceProvider.Stability:
        return (
          <>
            <ListItem
              title="Stability API Endpoint"
              subTitle="Your Stability API endpoint"
            >
              <input
                type="text"
                value={providerStore.stabilityUrl}
                onChange={(e) =>
                  providerStore.update(
                    (config) => (config.stabilityUrl = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
            <ListItem
              title="Stability API Key"
              subTitle="Your Stability API key"
            >
              <PasswordInput
                value={providerStore.stabilityApiKey}
                onChange={(e) =>
                  providerStore.update(
                    (config) =>
                      (config.stabilityApiKey = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
          </>
        );

      case ServiceProvider.Tencent:
        return (
          <>
            <ListItem
              title="Tencent API Endpoint"
              subTitle="Your Tencent API endpoint"
            >
              <input
                type="text"
                value={providerStore.tencentUrl}
                onChange={(e) =>
                  providerStore.update(
                    (config) => (config.tencentUrl = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
            <ListItem title="Secret ID" subTitle="Your Tencent secret ID">
              <PasswordInput
                value={providerStore.tencentSecretId}
                onChange={(e) =>
                  providerStore.update(
                    (config) =>
                      (config.tencentSecretId = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
            <ListItem title="Secret Key" subTitle="Your Tencent secret key">
              <PasswordInput
                value={providerStore.tencentSecretKey}
                onChange={(e) =>
                  providerStore.update(
                    (config) =>
                      (config.tencentSecretKey = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
          </>
        );

      case ServiceProvider.Iflytek:
        return (
          <>
            <ListItem
              title="Iflytek API Endpoint"
              subTitle="Your Iflytek API endpoint"
            >
              <input
                type="text"
                value={providerStore.iflytekUrl}
                onChange={(e) =>
                  providerStore.update(
                    (config) => (config.iflytekUrl = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
            <ListItem title="API Key" subTitle="Your Iflytek API key">
              <PasswordInput
                value={providerStore.iflytekApiKey}
                onChange={(e) =>
                  providerStore.update(
                    (config) => (config.iflytekApiKey = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
            <ListItem title="API Secret" subTitle="Your Iflytek API secret">
              <PasswordInput
                value={providerStore.iflytekApiSecret}
                onChange={(e) =>
                  providerStore.update(
                    (config) =>
                      (config.iflytekApiSecret = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
          </>
        );

      case ServiceProvider.DeepSeek:
        return (
          <>
            <ListItem
              title="DeepSeek API Endpoint"
              subTitle="Your DeepSeek API endpoint"
            >
              <input
                type="text"
                value={providerStore.deepseekUrl}
                onChange={(e) =>
                  providerStore.update(
                    (config) => (config.deepseekUrl = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
            <ListItem title="API Key" subTitle="Your DeepSeek API key">
              <PasswordInput
                value={providerStore.deepseekApiKey}
                onChange={(e) =>
                  providerStore.update(
                    (config) => (config.deepseekApiKey = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
          </>
        );

      case ServiceProvider.XAI:
        return (
          <>
            <ListItem title="XAI API Endpoint" subTitle="Your XAI API endpoint">
              <input
                type="text"
                value={providerStore.xaiUrl}
                onChange={(e) =>
                  providerStore.update(
                    (config) => (config.xaiUrl = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
            <ListItem title="API Key" subTitle="Your XAI API key">
              <PasswordInput
                value={providerStore.xaiApiKey}
                onChange={(e) =>
                  providerStore.update(
                    (config) => (config.xaiApiKey = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
          </>
        );

      case ServiceProvider.ChatGLM:
        return (
          <>
            <ListItem
              title="ChatGLM API Endpoint"
              subTitle="Your ChatGLM API endpoint"
            >
              <input
                type="text"
                value={providerStore.chatglmUrl}
                onChange={(e) =>
                  providerStore.update(
                    (config) => (config.chatglmUrl = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
            <ListItem title="API Key" subTitle="Your ChatGLM API key">
              <PasswordInput
                value={providerStore.chatglmApiKey}
                onChange={(e) =>
                  providerStore.update(
                    (config) => (config.chatglmApiKey = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
          </>
        );

      case ServiceProvider.SiliconFlow:
        return (
          <>
            <ListItem
              title="SiliconFlow API Endpoint"
              subTitle="Your SiliconFlow API endpoint"
            >
              <input
                type="text"
                value={providerStore.siliconflowUrl}
                onChange={(e) =>
                  providerStore.update(
                    (config) => (config.siliconflowUrl = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
            <ListItem title="API Key" subTitle="Your SiliconFlow API key">
              <PasswordInput
                value={providerStore.siliconflowApiKey}
                onChange={(e) =>
                  providerStore.update(
                    (config) =>
                      (config.siliconflowApiKey = e.currentTarget.value),
                  )
                }
              />
            </ListItem>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="modal-mask">
      <Modal
        title="Provider Configuration"
        onClose={() => props.onClose?.()}
        actions={[
          <IconButton
            key="close"
            onClick={props.onClose}
            icon={<CloseIcon />}
            bordered
            text="Close"
          />,
        ]}
      >
        <List>
          <ListItem title="Provider" subTitle="Select API provider">
            <Select
              value={provider}
              onChange={(e) => setProvider(e.target.value as ServiceProvider)}
            >
              {Object.entries(ServiceProvider).map(([k, v]) => (
                <option value={v} key={k}>
                  {k}
                </option>
              ))}
            </Select>
          </ListItem>
          {renderProviderConfig()}
        </List>
      </Modal>
    </div>
  );
}
