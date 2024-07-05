type Lead = {
  id: number;
  name: string;
  price: number;
  status: { name: string };
};

export type ApiResult = Lead[];
