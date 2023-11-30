type ActionResponseDataType<T> = Pick<Awaited<ReturnType<T>>, "data">["data"];
type ActionResponseType<T> = {
  status: number;
  message: string | null;
  data: T;
};

type Prettify<T> = {
  [K in keyof T]: T[K];
};
