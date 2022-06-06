export const filterList = [
  {
    name: "date",
    type: "date",
    label: "Data solicitação",
  },
  {
    name: "withdrawAmount",
    type: "number",
    label: "Valor",
  },
  {
    name: "status",
    type: "select",
    list: [
      {
        id: 0,
        text: "Aprovado",
      },
      {
        id: 1,
        text: "Reprovado",
      },
      {
        id: 2,
        text: "Processando",
      },
    ],
    label: "Status",
  },
];
export const tableHead = [
  {
    text: "Data",
    id: 1,
  },
  {
    text: "Tipo",
    id: 2,
  },
  //   {
  //     text: "Transação",
  //     id: 3,
  //   },
  {
    text: "Valor USDX",
    id: 4,
  },
  // {
  //     text: "Valor BRL",
  //     id: 5,

  // },
];

export const MOCKUP = [
  {
    id: 0,
    date: "13/03/2022",
    action: "Crédito",
    status: "Ativo",
    walletAdress: "8962-53316-98654-6523",
    currency: "USDX",
  },
  {
    id: 1,
    date: "13/03/2022",
    action: "Saque",
    status: "Ativo",
    walletAdress: "8962-53316-98654-6523",
    currency: "USDX",
  },
  {
    id: 2,
    date: "13/03/2022",
    action: "Saque",
    status: "Ativo",
    walletAdress: "8962-53316-98654-6523",
    currency: "USDX",
  },
  {
    id: 3,
    date: "13/03/2022",
    action: "Saque",
    status: "Ativo",
    walletAdress: "8962-53316-98654-6523",
    currency: "USDX",
  },
  {
    id: 4,
    date: "13/03/2022",
    action: "Saque",
    status: "Ativo",
    walletAdress: "8962-53316-98654-6523",
    currency: "USDX",
  },
  {
    id: 5,
    date: "13/03/2022",
    action: "Crédito",
    status: "Ativo",
    walletAdress: "8962-53316-98654-6523",
    currency: "USDX",
  },
  {
    id: 6,
    date: "13/03/2022",
    action: "Crédito",
    status: "Ativo",
    walletAdress: "8962-53316-98654-6523",
    currency: "USDX",
  },
  {
    id: 7,
    date: "13/03/2022",
    action: "Crédito",
    status: "Ativo",
    walletAdress: "8962-53316-98654-6523",
    currency: "USDX",
  },
  {
    id: 8,
    date: "13/03/2022",
    action: "Crédito",
    status: "Ativo",
    walletAdress: "8962-53316-98654-6523",
    currency: "USDX",
  },
];
