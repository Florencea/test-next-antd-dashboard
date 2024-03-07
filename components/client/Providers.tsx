"use client";
import { I18nProviderClient } from "@/libs/client/i18n";
import tailwindConfig from "@/tailwind.config";
import { StyleProvider } from "@ant-design/cssinjs";
import { App, ConfigProvider } from "antd";
import type { Locale } from "antd/es/locale";
import enUS from "antd/es/locale/en_US";
import zhTW from "antd/es/locale/zh_TW";
import "dayjs/locale/en";
import "dayjs/locale/zh-tw";

const PRIMARY_COLOR = tailwindConfig.theme.extend.colors.primary;
const localeMap: Record<string, Locale> = {
  "zh-TW": zhTW,
  "en-US": enUS,
};

interface Props {
  locale: string;
  children: React.ReactNode;
}

export const Providers = ({ locale, children }: Props) => {
  return (
    <I18nProviderClient locale={locale}>
      <ConfigProvider
        locale={localeMap[locale]}
        theme={{
          token: {
            colorPrimary: PRIMARY_COLOR,
            colorInfo: PRIMARY_COLOR,
          },
        }}
        autoInsertSpaceInButton={false}
      >
        <StyleProvider hashPriority="high">
          <App>{children}</App>
        </StyleProvider>
      </ConfigProvider>
    </I18nProviderClient>
  );
};
