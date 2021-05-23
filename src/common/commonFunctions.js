import { evaluate } from "mathjs";


export const mathCalculateFromUI = (
  items,
  parensBtnVals,
  operatorVals,
) => {
  let testString = "";
  parensBtnVals.map((val, idx) => {
    testString += val ? idx : "";
    return null;
  });
  /* If any of the operators is blank, return */
  if (operatorVals[0] === 0 || operatorVals[1] === 0 || operatorVals[2] === 0) {
    return 0;
  }
  const operatorLabelsMath = ["", "+", "-", "*", "/"];

  const v1 = items[0].val;
  const v2 = items[1].val;
  const v3 = items[2].val;
  const v4 = items[3].val;
  const o1 = operatorLabelsMath[operatorVals[0]];
  const o2 = operatorLabelsMath[operatorVals[1]];
  const o3 = operatorLabelsMath[operatorVals[2]];
  let mathStr = "";
  switch (testString) {
    case "02": // (1+2)+(3+4)
      mathStr = "(" + v1 + o1 + v2 + ")" + o2 + "(" + v3 + o3 + v4 + ")";
      break;
    case "0": // (0+1)+2+3
      mathStr = "(" + v1 + o1 + v2 + ")" + o2 + v3 + o3 + v4;
      break;
    case "1": // 0+(1+2)+3
      mathStr = v1 + o1 + "(" + v2 + o2 + v3 + ")" + o3 + v4;
      break;
    case "2": // 0+2+(2+3)
      mathStr = v1 + o1 + v2 + o2 + "(" + v3 + o3 + v4 + ")";
      break;
    case "3": // (1+2+3)+4
      mathStr = "(" + v1 + o1 + v2 + o2 + v3 + ")" + o3 + v4;
      break;
    case "4": // 0+(1+2+3)
      mathStr = v1 + o1 + "(" + v2 + o2 + v3 + o3 + v4 + ")";
      break;
    default:
        mathStr = v1 + o1 + v2 + o2 + v3 + o3 + v4;
      break;
  }
  // mathjs evaluate avoids the use of eval(), which is highly dangerous
  return evaluate(mathStr);
};

export default {
  mathCalculateFromUI
};
