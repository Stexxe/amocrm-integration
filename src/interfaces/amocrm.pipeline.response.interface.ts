export interface AmocrmPipelineResponse {
  _embedded: {
    statuses: {
      id: number;
      name: string;
    }[];
  };
}
