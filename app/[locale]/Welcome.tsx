"use client";
import { useChangeLocale, useI18n } from "@/libs/client/i18n";
import { App, Button } from "antd";
import { useState } from "react";

export const Welcome = () => {
  const [count, setCount] = useState(1);
  const t = useI18n();
  const changeLocale = useChangeLocale();
  const { message } = App.useApp();
  return (
    <div>
      <div>
        <p>{t("hello")}</p>
        <Button
          type="primary"
          onClick={() => {
            setCount(count + 1);
            if (count > 3) {
              message.info(`${t("hello")} ${count}`);
            }
          }}
        >
          count: {count}
        </Button>
        <Button
          onClick={() => {
            changeLocale("zh-TW");
          }}
        >
          to zh-TW
        </Button>
        <Button
          onClick={() => {
            changeLocale("en-US");
          }}
        >
          to en-US
        </Button>
      </div>
    </div>
  );
};
