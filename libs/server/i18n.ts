import { createI18nServer } from "next-international/server";

export const { getI18n, getScopedI18n, getStaticParams, getCurrentLocale } =
  createI18nServer({
    "en-US": () => import("@/locales/en-US"),
    "zh-TW": () => import("@/locales/zh-TW"),
  });
