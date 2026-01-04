export type Post = {
  id: number;
  title: string;
  body: string;
};

export type ParamsPostProps = {
  params: { id: string };
};
