import React from "react";
import LogoBancoDoBrasil from "@shared/assets/svg/logo-bancos/banco-brasil.svg";
import LogoItau from "@shared/assets/svg/logo-bancos/itau.svg";
import LogoNubank from "@shared/assets/svg/logo-bancos/nubank.svg";
import LogoSantander from "@shared/assets/svg/logo-bancos/santander.svg";

export const BANK_CODE = {
  SANTANDER: "033",
  ITAU: "341",
  BANCO_DO_BRASIL: "001",
  NUBANK: "260",
};

export const BANK_DICTIONARY = {
  [BANK_CODE.SANTANDER]: {
    label: "Santander",
    icon: <LogoSantander fill="#F70000" />,
  },
  [BANK_CODE.ITAU]: {
    label: "Itaú",
    icon: <LogoItau fill="#2D2F8D" />,
  },
  [BANK_CODE.BANCO_DO_BRASIL]: {
    label: "Banco do Brasil",
    icon: <LogoBancoDoBrasil fill="#003B9F" />,
  },
  [BANK_CODE.NUBANK]: {
    label: "Nubank",
    icon: <LogoNubank fill="#8303D2" />,
  },
};
