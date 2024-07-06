export interface AmocrmLinksResponse {
  _embedded: {
    links: {
      to_entity_id: number;
      to_entity_type: string;
    }[];
  };
}
