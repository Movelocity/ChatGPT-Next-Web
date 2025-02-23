import {
  GoogleSafetySettingsThreshold,
  ServiceProvider,
  StoreKey,
  ApiPath,
  OPENAI_BASE_URL,
  ANTHROPIC_BASE_URL,
  GEMINI_BASE_URL,
  BAIDU_BASE_URL,
  BYTEDANCE_BASE_URL,
  ALIBABA_BASE_URL,
  TENCENT_BASE_URL,
  MOONSHOT_BASE_URL,
  STABILITY_BASE_URL,
  IFLYTEK_BASE_URL,
  DEEPSEEK_BASE_URL,
  XAI_BASE_URL,
  CHATGLM_BASE_URL,
  SILICONFLOW_BASE_URL,
} from "../constant";
import { getHeaders } from "../client/api";
import { getClientConfig } from "../config/client";
import { createPersistStore } from "../utils/store";
import { ensure } from "../utils/clone";
import { DEFAULT_CONFIG } from "./config";
import { getModelProvider } from "../utils/model";
import { useProviderStore } from "./provider";

let fetchState = 0; // 0 not fetch, 1 fetching, 2 done

const isApp = getClientConfig()?.buildMode === "export";

const DEFAULT_OPENAI_URL = isApp ? OPENAI_BASE_URL : ApiPath.OpenAI;

const DEFAULT_GOOGLE_URL = isApp ? GEMINI_BASE_URL : ApiPath.Google;

const DEFAULT_ANTHROPIC_URL = isApp ? ANTHROPIC_BASE_URL : ApiPath.Anthropic;

const DEFAULT_BAIDU_URL = isApp ? BAIDU_BASE_URL : ApiPath.Baidu;

const DEFAULT_BYTEDANCE_URL = isApp ? BYTEDANCE_BASE_URL : ApiPath.ByteDance;

const DEFAULT_ALIBABA_URL = isApp ? ALIBABA_BASE_URL : ApiPath.Alibaba;

const DEFAULT_TENCENT_URL = isApp ? TENCENT_BASE_URL : ApiPath.Tencent;

const DEFAULT_MOONSHOT_URL = isApp ? MOONSHOT_BASE_URL : ApiPath.Moonshot;

const DEFAULT_STABILITY_URL = isApp ? STABILITY_BASE_URL : ApiPath.Stability;

const DEFAULT_IFLYTEK_URL = isApp ? IFLYTEK_BASE_URL : ApiPath.Iflytek;

const DEFAULT_DEEPSEEK_URL = isApp ? DEEPSEEK_BASE_URL : ApiPath.DeepSeek;

const DEFAULT_XAI_URL = isApp ? XAI_BASE_URL : ApiPath.XAI;

const DEFAULT_CHATGLM_URL = isApp ? CHATGLM_BASE_URL : ApiPath.ChatGLM;

const DEFAULT_SILICONFLOW_URL = isApp
  ? SILICONFLOW_BASE_URL
  : ApiPath.SiliconFlow;

const DEFAULT_ACCESS_STATE = {
  accessCode: "",
  useCustomConfig: false,

  provider: ServiceProvider.OpenAI,

  // openai
  openaiUrl: DEFAULT_OPENAI_URL,
  openaiApiKey: "",

  // azure
  azureUrl: "",
  azureApiKey: "",
  azureApiVersion: "2023-08-01-preview",

  // google ai studio
  googleUrl: DEFAULT_GOOGLE_URL,
  googleApiKey: "",
  googleApiVersion: "v1",
  googleSafetySettings: GoogleSafetySettingsThreshold.BLOCK_ONLY_HIGH,

  // anthropic
  anthropicUrl: DEFAULT_ANTHROPIC_URL,
  anthropicApiKey: "",
  anthropicApiVersion: "2023-06-01",

  // baidu
  baiduUrl: DEFAULT_BAIDU_URL,
  baiduApiKey: "",
  baiduSecretKey: "",

  // bytedance
  bytedanceUrl: DEFAULT_BYTEDANCE_URL,
  bytedanceApiKey: "",

  // alibaba
  alibabaUrl: DEFAULT_ALIBABA_URL,
  alibabaApiKey: "",

  // moonshot
  moonshotUrl: DEFAULT_MOONSHOT_URL,
  moonshotApiKey: "",

  //stability
  stabilityUrl: DEFAULT_STABILITY_URL,
  stabilityApiKey: "",

  // tencent
  tencentUrl: DEFAULT_TENCENT_URL,
  tencentSecretKey: "",
  tencentSecretId: "",

  // iflytek
  iflytekUrl: DEFAULT_IFLYTEK_URL,
  iflytekApiKey: "",
  iflytekApiSecret: "",

  // deepseek
  deepseekUrl: DEFAULT_DEEPSEEK_URL,
  deepseekApiKey: "",

  // xai
  xaiUrl: DEFAULT_XAI_URL,
  xaiApiKey: "",

  // chatglm
  chatglmUrl: DEFAULT_CHATGLM_URL,
  chatglmApiKey: "",

  // siliconflow
  siliconflowUrl: DEFAULT_SILICONFLOW_URL,
  siliconflowApiKey: "",

  // server config
  needCode: true,
  hideUserApiKey: false,
  hideBalanceQuery: false,
  disableGPT4: false,
  disableFastLink: false,
  customModels: "",
  defaultModel: "",
  visionModels: "",

  // tts config
  edgeTTSVoiceName: "zh-CN-YunxiNeural",
};

interface DangerConfig {
  needCode: boolean;
  hideUserApiKey: boolean;
  disableGPT4: boolean;
  hideBalanceQuery: boolean;
  disableFastLink: boolean;
  customModels: string;
  defaultModel: string;
  visionModels: string;
  openaiApiKey?: string;
  openaiUrl?: string;
  azureApiKey?: string;
  azureUrl?: string;
  azureApiVersion?: string;
  googleApiKey?: string;
  googleUrl?: string;
  googleApiVersion?: string;
  anthropicApiKey?: string;
  anthropicUrl?: string;
  anthropicApiVersion?: string;
  baiduApiKey?: string;
  baiduUrl?: string;
  baiduSecretKey?: string;
  bytedanceApiKey?: string;
  bytedanceUrl?: string;
  alibabaApiKey?: string;
  alibabaUrl?: string;
  moonshotApiKey?: string;
  moonshotUrl?: string;
  stabilityApiKey?: string;
  stabilityUrl?: string;
  tencentSecretKey?: string;
  tencentSecretId?: string;
  tencentUrl?: string;
  iflytekApiKey?: string;
  iflytekUrl?: string;
  iflytekApiSecret?: string;
  deepseekApiKey?: string;
  deepseekUrl?: string;
  xaiApiKey?: string;
  xaiUrl?: string;
  chatglmApiKey?: string;
  chatglmUrl?: string;
  siliconflowApiKey?: string;
  siliconflowUrl?: string;
}

export const useAccessStore = createPersistStore(
  { ...DEFAULT_ACCESS_STATE },

  (set, get) => ({
    enabledAccessControl() {
      this.fetch();

      return get().needCode;
    },
    getVisionModels() {
      this.fetch();
      return get().visionModels;
    },
    edgeVoiceName() {
      this.fetch();

      return get().edgeTTSVoiceName;
    },

    isValidOpenAI() {
      return ensure(get(), ["openaiApiKey"]);
    },

    isValidAzure() {
      return ensure(get(), ["azureUrl", "azureApiKey", "azureApiVersion"]);
    },

    isValidGoogle() {
      return ensure(get(), ["googleApiKey"]);
    },

    isValidAnthropic() {
      return ensure(get(), ["anthropicApiKey"]);
    },

    isValidBaidu() {
      return ensure(get(), ["baiduApiKey", "baiduSecretKey"]);
    },

    isValidByteDance() {
      return ensure(get(), ["bytedanceApiKey"]);
    },

    isValidAlibaba() {
      return ensure(get(), ["alibabaApiKey"]);
    },

    isValidTencent() {
      return ensure(get(), ["tencentSecretKey", "tencentSecretId"]);
    },

    isValidMoonshot() {
      return ensure(get(), ["moonshotApiKey"]);
    },
    isValidIflytek() {
      return ensure(get(), ["iflytekApiKey"]);
    },
    isValidDeepSeek() {
      return ensure(get(), ["deepseekApiKey"]);
    },

    isValidXAI() {
      return ensure(get(), ["xaiApiKey"]);
    },

    isValidChatGLM() {
      return ensure(get(), ["chatglmApiKey"]);
    },

    isValidSiliconFlow() {
      return ensure(get(), ["siliconflowApiKey"]);
    },

    isAuthorized() {
      this.fetch();

      // has token or has code or disabled access control
      return (
        this.isValidOpenAI() ||
        this.isValidAzure() ||
        this.isValidGoogle() ||
        this.isValidAnthropic() ||
        this.isValidBaidu() ||
        this.isValidByteDance() ||
        this.isValidAlibaba() ||
        this.isValidTencent() ||
        this.isValidMoonshot() ||
        this.isValidIflytek() ||
        this.isValidDeepSeek() ||
        this.isValidXAI() ||
        this.isValidChatGLM() ||
        this.isValidSiliconFlow() ||
        !this.enabledAccessControl() ||
        (this.enabledAccessControl() && ensure(get(), ["accessCode"]))
      );
    },
    fetch() {
      if (fetchState > 0 || getClientConfig()?.buildMode === "export") return;
      fetchState = 1;

      // Get provider configurations
      const providerStore = useProviderStore.getState();

      // Update access store with provider configurations if they exist
      set((state) => ({
        ...state,
        openaiApiKey: providerStore.openaiApiKey || state.openaiApiKey,
        openaiUrl: providerStore.openaiUrl || state.openaiUrl,
        azureApiKey: providerStore.azureApiKey || state.azureApiKey,
        azureUrl: providerStore.azureUrl || state.azureUrl,
        azureApiVersion: providerStore.azureApiVersion || state.azureApiVersion,
        googleApiKey: providerStore.googleApiKey || state.googleApiKey,
        googleUrl: providerStore.googleUrl || state.googleUrl,
        googleApiVersion:
          providerStore.googleApiVersion || state.googleApiVersion,
        anthropicApiKey: providerStore.anthropicApiKey || state.anthropicApiKey,
        anthropicUrl: providerStore.anthropicUrl || state.anthropicUrl,
        anthropicApiVersion:
          providerStore.anthropicApiVersion || state.anthropicApiVersion,
        baiduApiKey: providerStore.baiduApiKey || state.baiduApiKey,
        baiduUrl: providerStore.baiduUrl || state.baiduUrl,
        baiduSecretKey: providerStore.baiduSecretKey || state.baiduSecretKey,
        bytedanceApiKey: providerStore.bytedanceApiKey || state.bytedanceApiKey,
        bytedanceUrl: providerStore.bytedanceUrl || state.bytedanceUrl,
        alibabaApiKey: providerStore.alibabaApiKey || state.alibabaApiKey,
        alibabaUrl: providerStore.alibabaUrl || state.alibabaUrl,
        moonshotApiKey: providerStore.moonshotApiKey || state.moonshotApiKey,
        moonshotUrl: providerStore.moonshotUrl || state.moonshotUrl,
        stabilityApiKey: providerStore.stabilityApiKey || state.stabilityApiKey,
        stabilityUrl: providerStore.stabilityUrl || state.stabilityUrl,
        tencentSecretKey:
          providerStore.tencentSecretKey || state.tencentSecretKey,
        tencentSecretId: providerStore.tencentSecretId || state.tencentSecretId,
        tencentUrl: providerStore.tencentUrl || state.tencentUrl,
        iflytekApiKey: providerStore.iflytekApiKey || state.iflytekApiKey,
        iflytekUrl: providerStore.iflytekUrl || state.iflytekUrl,
        iflytekApiSecret:
          providerStore.iflytekApiSecret || state.iflytekApiSecret,
        deepseekApiKey: providerStore.deepseekApiKey || state.deepseekApiKey,
        deepseekUrl: providerStore.deepseekUrl || state.deepseekUrl,
        xaiApiKey: providerStore.xaiApiKey || state.xaiApiKey,
        xaiUrl: providerStore.xaiUrl || state.xaiUrl,
        chatglmApiKey: providerStore.chatglmApiKey || state.chatglmApiKey,
        chatglmUrl: providerStore.chatglmUrl || state.chatglmUrl,
        siliconflowApiKey:
          providerStore.siliconflowApiKey || state.siliconflowApiKey,
        siliconflowUrl: providerStore.siliconflowUrl || state.siliconflowUrl,
      }));

      fetch("/api/config", {
        method: "post",
        body: null,
        headers: {
          ...getHeaders(),
        },
      })
        .then((res) => res.json())
        .then((res) => {
          const defaultModel = res.defaultModel ?? "";
          if (defaultModel !== "") {
            const [model, providerName] = getModelProvider(defaultModel);
            DEFAULT_CONFIG.modelConfig.model = model;
            DEFAULT_CONFIG.modelConfig.providerName = providerName as any;
          }

          return res;
        })
        .then((res: DangerConfig) => {
          console.log("[Config] got config from server", res);
          set((state) => ({
            ...state,
            ...res,
            // Keep provider configurations from UI if they exist
            openaiApiKey:
              providerStore.openaiApiKey ||
              res.openaiApiKey ||
              state.openaiApiKey,
            openaiUrl:
              providerStore.openaiUrl || res.openaiUrl || state.openaiUrl,
            azureApiKey:
              providerStore.azureApiKey || res.azureApiKey || state.azureApiKey,
            azureUrl: providerStore.azureUrl || res.azureUrl || state.azureUrl,
            azureApiVersion:
              providerStore.azureApiVersion ||
              res.azureApiVersion ||
              state.azureApiVersion,
            googleApiKey:
              providerStore.googleApiKey ||
              res.googleApiKey ||
              state.googleApiKey,
            googleUrl:
              providerStore.googleUrl || res.googleUrl || state.googleUrl,
            googleApiVersion:
              providerStore.googleApiVersion ||
              res.googleApiVersion ||
              state.googleApiVersion,
            anthropicApiKey:
              providerStore.anthropicApiKey ||
              res.anthropicApiKey ||
              state.anthropicApiKey,
            anthropicUrl:
              providerStore.anthropicUrl ||
              res.anthropicUrl ||
              state.anthropicUrl,
            anthropicApiVersion:
              providerStore.anthropicApiVersion ||
              res.anthropicApiVersion ||
              state.anthropicApiVersion,
            baiduApiKey:
              providerStore.baiduApiKey || res.baiduApiKey || state.baiduApiKey,
            baiduUrl: providerStore.baiduUrl || res.baiduUrl || state.baiduUrl,
            baiduSecretKey:
              providerStore.baiduSecretKey ||
              res.baiduSecretKey ||
              state.baiduSecretKey,
            bytedanceApiKey:
              providerStore.bytedanceApiKey ||
              res.bytedanceApiKey ||
              state.bytedanceApiKey,
            bytedanceUrl:
              providerStore.bytedanceUrl ||
              res.bytedanceUrl ||
              state.bytedanceUrl,
            alibabaApiKey:
              providerStore.alibabaApiKey ||
              res.alibabaApiKey ||
              state.alibabaApiKey,
            alibabaUrl:
              providerStore.alibabaUrl || res.alibabaUrl || state.alibabaUrl,
            moonshotApiKey:
              providerStore.moonshotApiKey ||
              res.moonshotApiKey ||
              state.moonshotApiKey,
            moonshotUrl:
              providerStore.moonshotUrl || res.moonshotUrl || state.moonshotUrl,
            stabilityApiKey:
              providerStore.stabilityApiKey ||
              res.stabilityApiKey ||
              state.stabilityApiKey,
            stabilityUrl:
              providerStore.stabilityUrl ||
              res.stabilityUrl ||
              state.stabilityUrl,
            tencentSecretKey:
              providerStore.tencentSecretKey ||
              res.tencentSecretKey ||
              state.tencentSecretKey,
            tencentSecretId:
              providerStore.tencentSecretId ||
              res.tencentSecretId ||
              state.tencentSecretId,
            tencentUrl:
              providerStore.tencentUrl || res.tencentUrl || state.tencentUrl,
            iflytekApiKey:
              providerStore.iflytekApiKey ||
              res.iflytekApiKey ||
              state.iflytekApiKey,
            iflytekUrl:
              providerStore.iflytekUrl || res.iflytekUrl || state.iflytekUrl,
            iflytekApiSecret:
              providerStore.iflytekApiSecret ||
              res.iflytekApiSecret ||
              state.iflytekApiSecret,
            deepseekApiKey:
              providerStore.deepseekApiKey ||
              res.deepseekApiKey ||
              state.deepseekApiKey,
            deepseekUrl:
              providerStore.deepseekUrl || res.deepseekUrl || state.deepseekUrl,
            xaiApiKey:
              providerStore.xaiApiKey || res.xaiApiKey || state.xaiApiKey,
            xaiUrl: providerStore.xaiUrl || res.xaiUrl || state.xaiUrl,
            chatglmApiKey:
              providerStore.chatglmApiKey ||
              res.chatglmApiKey ||
              state.chatglmApiKey,
            chatglmUrl:
              providerStore.chatglmUrl || res.chatglmUrl || state.chatglmUrl,
            siliconflowApiKey:
              providerStore.siliconflowApiKey ||
              res.siliconflowApiKey ||
              state.siliconflowApiKey,
            siliconflowUrl:
              providerStore.siliconflowUrl ||
              res.siliconflowUrl ||
              state.siliconflowUrl,
          }));
        })
        .catch(() => {
          console.error("[Config] failed to fetch config");
        })
        .finally(() => {
          fetchState = 2;
        });
    },
  }),
  {
    name: StoreKey.Access,
    version: 2,
    migrate(persistedState, version) {
      if (version < 2) {
        const state = persistedState as {
          token: string;
          openaiApiKey: string;
          azureApiVersion: string;
          googleApiKey: string;
        };
        state.openaiApiKey = state.token;
        state.azureApiVersion = "2023-08-01-preview";
      }

      return persistedState as any;
    },
  },
);
