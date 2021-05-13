import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { ticketsProvider } from './tickets.provider';

@Module({
  controllers: [TicketsController],
  providers: [TicketsService, ...ticketsProvider],
})
export class TicketsModule {}
