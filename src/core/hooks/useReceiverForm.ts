import { dinamicallyIdentifyAndFormat } from "@core/helpers";
import { TPixType, TReceiverFormData } from "@core/types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const INITIAL_STATE_EMPTY = {
  id: "",
  name: "",
  document: "",
  email: "",
  pixType: "email" as TPixType,
  pixKey: "",
};

export default function useReceiverForm(initialState: TReceiverFormData) {
  const { t } = useTranslation();

  const [data, setData] = useState<TReceiverFormData>(
    initialState ? initialState : INITIAL_STATE_EMPTY
  );

  const [config, setConfig] = useState({
    data: {
      name: {
        label: t("createReceiver.dataForm.name"),
      },
      document: {
        label: t("createReceiver.dataForm.document"),
        mask: dinamicallyIdentifyAndFormat,
      },
      email: {
        label: t("createReceiver.dataForm.email"),
      },
    },
    pix: {
      pixType: {
        label: t("createReceiver.pixForm.type"),
        type: "select",
        options: [
          {
            label: t("createReceiver.pixKeyTypes.email"),
            value: "email",
          },
          {
            label: t("createReceiver.pixKeyTypes.cpf"),
            value: "cpf",
          },
          {
            label: t("createReceiver.pixKeyTypes.cnpj"),
            value: "cnpj",
          },
          {
            label: t("createReceiver.pixKeyTypes.random"),
            value: "aleatoria",
          },
        ],
      },
      pixKey: {
        label: t("createReceiver.pixForm.key"),
        mask: dinamicallyIdentifyAndFormat,
      },
    },
  });

  function hidePixKey(hide: boolean) {
    setConfig((currConfig) => ({
      ...currConfig,
      pix: {
        ...currConfig.pix,
        pixKey: {
          ...currConfig.pix.pixKey,
          hide,
        },
      },
    }));
  }

  useEffect(() => {
    if (!initialState || initialState?.pixType !== data.pixType) {
      setData((currData) => ({
        ...currData,
        pixKey: "",
      }));
    }

    if (data.pixType === "aleatoria" && !initialState) {
      hidePixKey(true);
      return;
    }

    hidePixKey(false);
  }, [data.pixType]);

  return { data, setData, config };
}
