"use client";

import { useState } from "react";
import { CreditBlock } from "./CreditBlock";
import { DopOptionsBlock } from "./DopOptions";

const MIN = 10000;
const MAX = 7000000;
const STEP = 100;

const MIN_MONTH = 13;
const MAX_MONTH = 60;
const STEP_MONTH = 1;

export const CashLoanBlock = () => {
  const [checkBox, setCheckBox] = useState(false);
  const [loverRate, setLoverRate] = useState(0);

  const handleClick = () => {
    let rate;
    setCheckBox(!checkBox);
    if (!checkBox) {
      rate = 0.15 / 12;
    } else {
      rate = 0;
    }
    setLoverRate(rate);
  };

  return (
    <CreditBlock
      MIN={MIN}
      MAX={MAX}
      STEP={STEP}
      MIN_MONTH={MIN_MONTH}
      MAX_MONTH={MAX_MONTH}
      STEP_MONTH={STEP_MONTH}
      defaultValue={MAX}
      loverRate={loverRate}
    >
      <DopOptionsBlock handleClick={handleClick} checkBox={checkBox} />
    </CreditBlock>
  );
};
