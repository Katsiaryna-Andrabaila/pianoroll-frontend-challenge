import { Color } from "../types.ts";
import { generateGradientTable } from "./generateGradientTable.ts";

const backgroundStartColor: Color = { r: 93, g: 181, b: 213 };
// #154151
const backgroundEndColor: Color = { r: 21, g: 65, b: 81 };
export const backgroundColormap = generateGradientTable(
  backgroundStartColor,
  backgroundEndColor,
  128
);

const noteStartColor: Color = { r: 66, g: 66, b: 61 };
const noteEndColor: Color = { r: 28, g: 28, b: 26 };
export const noteColormap = generateGradientTable(
  noteStartColor,
  noteEndColor,
  128
);
