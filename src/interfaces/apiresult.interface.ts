type Lead = {
  id: number;
  name: string;
  price: number;
  status: { name: string };
  responsibleUser: { name: string };
  createdAt: string;
};

export type ApiResult = Lead[];
