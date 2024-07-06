export interface AmocrmContactResponse {
  id: number;
  name: string;
  custom_fields_values: {
    field_code: string;
    values: {
      value: string;
    }[];
  }[];
}
