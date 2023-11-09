import { ReactNode } from "react";

export type TPixType = "aleatoria" | "cnpj" | "cpf" | "email";
export type TStatus = "validado" | "rascunho";

export type TReceiverFormData = {
  id: string;
  name: string;
  taxId: string;
  email: string;
  pixType: TPixType;
  pixKey: string;
};

export type TReceiverToEdit = {
  id: string;
  name: string;
  taxId: string;
  bankId: string;
  branch: string;
  account: string;
  accountType: string;
  status: TStatus;
  email: string;
  pixType: TPixType;
  pixKey: string;
};

export type TReceiverSource = {
  id: string;
  name: string;
  email: string;
  tax_id: string;
  branch: string | null;
  account: string | null;
  account_type: string | null;
  bank_name: string | null;
  bank_code: string | null;
  pix_key: string | null;
  pix_key_type: TPixType;
  status: TStatus;
  created_at: string;
  updated_at: string;
};

export type TReceiver = {
  source: TReceiverSource[];
  receiverToEdit: TReceiverToEdit;
};

export type TReceiverFormField = {
  label: string;
  hide?: boolean;
  disabled?: boolean;
  mask?: (value: string) => string;
  type?: string;
  options?: Array<{ label: string; value: string }>;
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

export type TToast = {
  isOpen: boolean;
  content: ReactNode | null;
};

export type TPagination<T> = {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  paginatedData?: T[][];
};
