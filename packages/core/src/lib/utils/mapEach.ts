export type MapEachFn<I> = (item: I, key: string) => void;

export function mapEach<
  R extends { [key: string]: any } = Record<string, unknown>,
  I = Record<string, unknown>
>(map: R, fn: MapEachFn<I>) {
  Object.keys(map).forEach((key: string) => fn(map[key], key));
}
