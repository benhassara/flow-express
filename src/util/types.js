// @flow
export interface ErrnoError extends Error {
  errno?: number;
  code?: string;
  path?: string;
  syscall?: string;
}

export type Produce = {
  id?: number,
  name: string,
  quantity: number,
  price: number
};
