"use client";

import { CreditBlock } from "./CreditBlock";

const MIN = 500000;
const MAX = 7000000;
const STEP = 100;

const MIN_MONTH = 13;
const MAX_MONTH = 60;
const STEP_MONTH = 1;

export const AvtoCredit = () => {
  return (
    <CreditBlock
      MIN={MIN}
      MAX={MAX}
      STEP={STEP}
      MIN_MONTH={MIN_MONTH}
      MAX_MONTH={MAX_MONTH}
      STEP_MONTH={STEP_MONTH}
      defaultValue={MIN}
    />
  );
};
