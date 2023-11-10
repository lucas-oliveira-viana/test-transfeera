export default {
  translations: {
    tabs: {
      yourReceivers: "Seus favorecidos",
    },
    home: {
      removeSelected: "Excluir selecionados",
      filterPlaceholder: "Nome, CPF, agência ou conta",
    },
    receiver: {
      name: "Favorecido",
      taxId: "CPF / CNPJ",
      bank: "Banco",
      branch: "Agência",
      account: "CC",
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
        taxId: "Qual o CPF ou CNPJ?",
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
    validatedReceiver: {
      taxId: "CPF / CNPJ",
      bank: "Banco",
      branch: "Agência",
      accountType: "Tipo de conta",
      email: "E-mail do favorecido",
    },
    table: {
      empty: "Nenhum registro encontrado",
    },
    notifications: {
      errorTryingToGetReceivers: "Erro ao buscar favorecidos",
      saveReceiversSuccess: "Favorecido salvo com sucesso",
      updateReceiversSuccess: "Favorecido alterado com sucesso",
      errorTryingToRemoveReceivers: "Erro ao remover favorecidos",
      genericError: "Erro ao executar operação",
    },
    confirmRemoveReceiver: {
      title: "Excluir favorecido",
      askConfirm: "Você confirma a exclusão do favorecido {{name}}?",
      description:
        "O Histórico de pagamentos para este favorecido será mantido, mas ele será removido da sua lista de favorecidos.",
      actions: {
        cancel: "Cancelar",
        confirm: "Confirmar exclusão",
      },
    },
  },
};
