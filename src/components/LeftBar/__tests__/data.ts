import { Methods } from "@/store/request";
import { methodColors } from "@/utils";

export const requestMethodResults: { method: Methods; color: string }[] = [];

for (const key in methodColors) {
  const method = key as Methods;
  requestMethodResults.push({ method, color: methodColors[method] });
}
