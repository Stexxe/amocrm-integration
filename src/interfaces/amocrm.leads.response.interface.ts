export interface AmocrmLeadsResponse {
  _embedded: {
    leads: {
      id: number;
      name: string;
      price: number;
      status_id: number;
      pipeline_id: number;
      created_at: number;
    }[];
  };
}
