import { Injectable, Inject } from '@nestjs/common';
import { TICKET_REPOSITORY } from '../constants';
import { Ticket } from './ticket.entity';
import { TicketDto } from './ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    @Inject(TICKET_REPOSITORY) private readonly ticketRepository: typeof Ticket,
  ) {}

  async create(ticket: TicketDto): Promise<Ticket> {
    return await this.ticketRepository.create<Ticket>({ ...ticket });
  }

  async findAll(): Promise<Ticket[]> {
    return await this.ticketRepository.findAll<Ticket>({});
  }

  async findOne(id): Promise<Ticket> {
    return await this.ticketRepository.findOne({
      where: { id },
    });
  }

  async delete(id) {
    return await this.ticketRepository.destroy({ where: { id } });
  }

  async update(id, data) {
    const [
      numberOfAffectedRows,
      [updatedTicket],
    ] = await this.ticketRepository.update(
      { ...data },
      { where: { id }, returning: true },
    );
    return { numberOfAffectedRows, updatedTicket };
  }
}
