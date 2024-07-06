import { Injectable } from '@nestjs/common';
import { Contact } from '../interfaces/contact.interface';
import { AmocrmFetcherService } from '../amocrm-fetcher/amocrm-fetcher.service';
import { AmocrmLinksResponse } from '../interfaces/amocrm.links.response.interface';
import { AmocrmContactResponse } from '../interfaces/amocrm.contact.response.interface';

@Injectable()
export class ContactsService {
  constructor(private amocrmService: AmocrmFetcherService) {}

  async getContacts(leadIds: number[]): Promise<{ [k: number]: Contact[] }> {
    const entities = await Promise.all(
      leadIds.map((id) =>
        this.amocrmService.read<AmocrmLinksResponse>(
          `/api/v4/leads/${id}/links`,
        ),
      ),
    );

    const contacts = new Set<number>();
    const companies = new Set<number>();
    const relations: { [k: number]: number[] } = {};
    for (const [i, linksResponse] of entities.entries()) {
      if (linksResponse == null) continue;

      const leadId = leadIds[i];
      relations[leadId] = relations[leadId] || [];

      for (const link of linksResponse._embedded.links) {
        if (link.to_entity_type === 'companies') {
          companies.add(link.to_entity_id);
          relations[leadId].push(link.to_entity_id);
        } else if (link.to_entity_type === 'contacts') {
          contacts.add(link.to_entity_id);
          relations[leadId].push(link.to_entity_id);
        }
      }
    }

    const contactResponses = await Promise.all(
      Array.from(contacts)
        .map((id) =>
          this.amocrmService.read<AmocrmContactResponse>(
            `/api/v4/contacts/${id}`,
          ),
        )
        .concat(
          Array.from(companies).map((id) =>
            this.amocrmService.read<AmocrmContactResponse>(
              `/api/v4/companies/${id}`,
            ),
          ),
        ),
    );

    const finalContacts: { [k: number]: Contact } = {};
    for (const response of contactResponses) {
      if (response == null) continue;
      const contact: Partial<Contact> = {
        id: response.id,
        name: response.name,
      };

      const fields = response.custom_fields_values || [];
      const phoneFields = fields.filter((f) => f.field_code === 'PHONE');

      if (phoneFields.length > 0 && phoneFields[0].values.length > 0) {
        contact.phone = phoneFields[0].values[0].value;
      }

      const emailFields = fields.filter((f) => f.field_code === 'EMAIL');

      if (emailFields.length > 0 && emailFields[0].values.length > 0) {
        contact.email = emailFields[0].values[0].value;
      }

      finalContacts[response.id] = {
        id: contact.id,
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
      };
    }

    const result = {};
    for (const [leadId, contactsIds] of Object.entries(relations)) {
      result[leadId] = contactsIds.map((id) => finalContacts[id]);
    }

    return result;
  }
}
