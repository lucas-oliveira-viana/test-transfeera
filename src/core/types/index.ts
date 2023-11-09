import { ReactNode } from "react";

export type TPixType = "aleatoria" | "cnpj" | "cpf" | "email";
export type TStatus = "validado" | "rascunho";

export type TReceiverFormData = {
  id: string;
  name: string;
  document: string;
  email: string;
  pixType: TPixType;
  pixKey: string;
};

export type TReceiverApi = {
  id: string;
  name: string;
  email: string;
  tax_id: string;
  branch: string;
  account: string;
  account_type: string;
  bank_name: string;
  bank_code: string;
  pix_key: string;
  pix_key_type: TPixType;
  status: TStatus;
  created_at: string;
  updated_at: string;
};

export type TReceiver = {
  apiResponse: TReceiverApi[];
  formData: TReceiverFormData;
};

export type TColumnConfig<T> = {
  label: string;
  key: keyof T;
  render?: (data: T) => ReactNode;
};

export type TTableConfig<T> = {
  columns: TColumnConfig<T>[];
  style?: { [key: string]: string };
};

export type TDialog = {
  isOpen: boolean;
  content: ReactNode | null;
};
