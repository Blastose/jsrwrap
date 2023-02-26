export interface Data {
  kind: string;
  data: unknown;
}

export function extractData(data: Data[]) {
  const res = data.map((r) => r.data);
  return res;
}
