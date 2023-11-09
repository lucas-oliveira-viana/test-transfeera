export default {
  translations: {
    tabs: {
      yourReceivers: "Seus favorecidos",
    },
    home: {
      removeSelected: "Excluir selecionados",
    },
    receiver: {
      name: "Favorecido",
      taxId: "CPF / CNPJ",
      bank: "Banco",
      branch: "Agência",
      account: "Conta",
      status: "Status do favorecido",
      statusTypes: {
        draft: "Rascunho",
        validated: "Validado",
      },
    },
    createReceiver: {
      dataTitle: "Quais os dados do favorecido?",
      dataForm: {
        name: "Qual o nome completo ou  razão social do favorecido?",
        document: "Qual o CPF ou CNPJ?",
        email: "Qual o e-mail para o envio do comprovante?",
      },
      pixTitle: "Qual a chave pix?",
      pixForm: {
        type: "Tipo da chave",
        key: "Chave",
      },
      pixKeyTypes: {
        email: "E-mail",
        cpf: "CPF",
        cnpj: "CNPJ",
        random: "Aleatória",
      },
      actions: {
        cancel: "Cancelar",
        save: "Salvar",
      },
    },
    table: {
      empty: "Nenhum registro encontrado",
    },
    notifications: {
      errorTryingToGetReceivers: "Erro ao buscar favorecidos",
      saveReceiversSuccess: "Favorecido salvo com sucesso",
      updateReceiversSuccess: "Favorecido alterado com sucesso",
    },
  },
};
