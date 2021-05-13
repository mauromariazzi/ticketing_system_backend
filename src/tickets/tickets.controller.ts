import {
  Controller,
  NotFoundException,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Ticket as TicketEntity } from './ticket.entity';
import { TicketDto } from './ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  async findAll() {
    return await this.ticketsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TicketEntity> {
    const ticket = await this.ticketsService.findOne(id);

    if (!ticket) throw new NotFoundException("This ticket doesn't exist");

    return ticket;
  }

  @Post()
  async create(@Body() ticket: TicketDto): Promise<TicketEntity> {
    return await this.ticketsService.create(ticket);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() ticket: TicketDto,
  ): Promise<TicketEntity> {
    // get the number of row affected and the updated ticket
    const {
      numberOfAffectedRows,
      updatedTicket,
    } = await this.ticketsService.update(id, ticket);

    // if the number of row affected is zero,
    // it means the ticket doesn't exist in our db
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This ticket doesn't exist");
    }

    // return the updated ticket
    return updatedTicket;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    // delete the ticket with this id
    const deleted = await this.ticketsService.delete(id);

    // if the number of row affected is zero,
    // then the ticket doesn't exist in our db
    if (deleted === 0) {
      throw new NotFoundException("This ticket doesn't exist");
    }

    // return success message
    return 'Successfully deleted';
  }
}
