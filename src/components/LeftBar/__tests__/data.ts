import { TMethods } from "@/store/request";
import { methodColors } from "@/utils";

export const requestMethodResults: { method: TMethods; color: string }[] = [];

for (const key in methodColors) {
  const method = key as TMethods;
  requestMethodResults.push({ method, color: methodColors[method] });
}
