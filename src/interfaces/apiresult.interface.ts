import { Contact } from './contact.interface';

type Lead = {
  id: number;
  name: string;
  price: number;
  status: { name: string };
  responsibleUser: { name: string };
  createdAt: string;
  contacts: Contact[];
};

export type ApiResult = Lead[];
