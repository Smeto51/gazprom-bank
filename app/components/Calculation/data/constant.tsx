import { AvtoCredit } from "../../Desktop/Calculate/CreditBlock/AutoCredit";
import { CashLoanBlock } from "../../Desktop/Calculate/CreditBlock/CashLoan";
import { CreditCardPayments } from "../../Desktop/Calculate/CreditCardPayBlock/CreditCardPayments";
import { DepositsBlock } from "../../Desktop/Calculate/DepositBlock/Deposits";

const DOMEN = "/Calculation/";

export const CALCULATION_ITEMS = [
  {
    id: 1,
    title: "Доход от вклада",
    icon: "https://cdn.gpb.ru/upload/files/bve/062/cg0htu79103z9klcneu2cixu8qmd1dd8/x1_Kredit-nalichnymi.png",
    localIcon: DOMEN + "nalichka.png",
    blockLg: <DepositsBlock />,
  },
  {
    id: 2,
    title: "Платежи по кредитке",
    icon: "https://cdn.gpb.ru/upload/files/bve/eec/6rwelzh050ptff7n9kj871mgu97nt2ie/x1_Platezhi-po-kreditke.png",
    localIcon: DOMEN + "platezi.png",
    blockLg: <CreditCardPayments />,
  },
  {
    id: 3,
    title: "Кредит наличными",
    icon: "https://cdn.gpb.ru/upload/files/bve/ac8/e1h3c9wd9ft5t9z9j2y4uuvvd0vn79os/x1_Dokhod-ot-vklada.png",
    localIcon: DOMEN + "doxodVklada.png",
    blockLg: <CashLoanBlock />,
  },
  {
    id: 4,
    title: "Автокредит",
    icon: "https://cdn.gpb.ru/upload/files/bve/a74/yxvbfuhhqfmn2vjm4l4kffaz678hq5ge/x1_Avtokredit.png",
    localIcon: DOMEN + "avtokredit.png",
    blockLg: <AvtoCredit />,
  },
];
