import { Ticket } from './ticket.entity';
import { TICKET_REPOSITORY } from '../constants';

export const ticketsProvider = [
  {
    provide: TICKET_REPOSITORY,
    useValue: Ticket,
  },
];
