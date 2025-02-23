import { StoreKey } from "../constant";
import { createPersistStore } from "../utils/store";

export interface ProviderConfig {
  openaiApiKey: string;
  openaiUrl: string;
  azureApiKey: string;
  azureUrl: string;
  azureApiVersion: string;
  googleApiKey: string;
  googleUrl: string;
  googleApiVersion: string;
  anthropicApiKey: string;
  anthropicUrl: string;
  anthropicApiVersion: string;
  baiduApiKey: string;
  baiduUrl: string;
  baiduSecretKey: string;
  bytedanceApiKey: string;
  bytedanceUrl: string;
  alibabaApiKey: string;
  alibabaUrl: string;
  moonshotApiKey: string;
  moonshotUrl: string;
  stabilityApiKey: string;
  stabilityUrl: string;
  tencentSecretKey: string;
  tencentSecretId: string;
  tencentUrl: string;
  iflytekApiKey: string;
  iflytekUrl: string;
  iflytekApiSecret: string;
  deepseekApiKey: string;
  deepseekUrl: string;
  xaiApiKey: string;
  xaiUrl: string;
  chatglmApiKey: string;
  chatglmUrl: string;
  siliconflowApiKey: string;
  siliconflowUrl: string;
}

const DEFAULT_PROVIDER_CONFIG: ProviderConfig = {
  openaiApiKey: "",
  openaiUrl: "",
  azureApiKey: "",
  azureUrl: "",
  azureApiVersion: "2023-08-01-preview",
  googleApiKey: "",
  googleUrl: "",
  googleApiVersion: "v1",
  anthropicApiKey: "",
  anthropicUrl: "",
  anthropicApiVersion: "2023-06-01",
  baiduApiKey: "",
  baiduUrl: "",
  baiduSecretKey: "",
  bytedanceApiKey: "",
  bytedanceUrl: "",
  alibabaApiKey: "",
  alibabaUrl: "",
  moonshotApiKey: "",
  moonshotUrl: "",
  stabilityApiKey: "",
  stabilityUrl: "",
  tencentSecretKey: "",
  tencentSecretId: "",
  tencentUrl: "",
  iflytekApiKey: "",
  iflytekUrl: "",
  iflytekApiSecret: "",
  deepseekApiKey: "",
  deepseekUrl: "",
  xaiApiKey: "",
  xaiUrl: "",
  chatglmApiKey: "",
  chatglmUrl: "",
  siliconflowApiKey: "",
  siliconflowUrl: "",
};

export const useProviderStore = createPersistStore(
  { ...DEFAULT_PROVIDER_CONFIG },
  (set, get) => ({
    reset() {
      set(() => ({ ...DEFAULT_PROVIDER_CONFIG }));
    },
  }),
  {
    name: StoreKey.Provider,
    version: 1,
  },
);
