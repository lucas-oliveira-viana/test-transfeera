import { dinamicallyIdentifyAndFormat } from "@core/helpers";
import { TPixType, TReceiverFormData, TReceiverToEdit } from "@core/types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const INITIAL_STATE_EMPTY = {
  id: "",
  name: "",
  taxId: "",
  email: "",
  pixType: "email" as TPixType,
  pixKey: "",
};

export default function useReceiverForm(initialState: TReceiverToEdit) {
  const { t } = useTranslation();

  function getInitalState(): TReceiverFormData {
    return initialState
      ? {
          id: initialState.id,
          name: initialState.name,
          taxId: initialState.taxId,
          email: initialState.email,
          pixType: initialState.pixType as TPixType,
          pixKey: initialState.pixKey,
        }
      : INITIAL_STATE_EMPTY;
  }

  function handleChangeFieldValue(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    key: keyof TReceiverFormData
  ) {
    setData((currData) => ({
      ...currData,
      [key]: e.target.value,
    }));
  }

  const [data, setData] = useState<TReceiverFormData>(getInitalState());

  const [config, setConfig] = useState({
    data: {
      name: {
        label: t("createReceiver.dataForm.name"),
      },
      taxId: {
        label: t("createReceiver.dataForm.taxId"),
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

  return { data, config, handleChangeFieldValue };
}
