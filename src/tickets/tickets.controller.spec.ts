import { Test, TestingModule } from '@nestjs/testing';
import { TicketsController } from './tickets.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database.module';
import { TicketsModule } from './tickets.module';
import * as moment from 'moment';

describe('TicketsController', () => {
  let ticketsController: TicketsController;

  const ticketExample = {
    title: 'test',
    description: 'description',
    status: 'created',
    due_date: new Date(),
    username: 'test user',
  };

  let createTicketId;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TicketsModule,
        DatabaseModule,
      ],
    }).compile();

    ticketsController = app.get<TicketsController>(TicketsController);
  });

  describe('tickets', () => {
    it('should create new ticket', async () => {
      const createdTicket = await ticketsController.create(ticketExample);
      expect(createdTicket).toBeDefined();
      expect(createdTicket).toHaveProperty('id');
      createTicketId = createdTicket.id;
      expect(createdTicket).toHaveProperty('title');
      expect(createdTicket.title).toEqual(ticketExample.title);
      expect(createdTicket).toHaveProperty('description');
      expect(createdTicket.description).toEqual(ticketExample.description);
      expect(createdTicket).toHaveProperty('status');
      expect(createdTicket.status).toEqual(ticketExample.status);
      expect(createdTicket).toHaveProperty('due_date');
      expect(moment(createdTicket.due_date).format('YYYY-MM-DD')).toEqual(
        moment(ticketExample.due_date).format('YYYY-MM-DD'),
      );
      expect(createdTicket).toHaveProperty('username');
      expect(createdTicket.username).toEqual(ticketExample.username);
    });
  });

  describe('tickets', () => {
    it('should return array of tickets', async () => {
      const response = await ticketsController.findAll();
      expect(response).toBeDefined();
    });
  });

  describe('tickets', () => {
    it('should update existing ticket', async () => {
      ticketExample.description = 'updated description';
      const updatedTicket = await ticketsController.update(
        createTicketId,
        ticketExample,
      );
      expect(updatedTicket).toBeDefined();
      expect(updatedTicket.description).toEqual(ticketExample.description);
    });
  });

  describe('tickets', () => {
    it('should delete existing ticket', async () => {
      const deletedRows = await ticketsController.remove(createTicketId);
      expect(deletedRows).toBeDefined();
      expect(deletedRows).toEqual('Successfully deleted');
    });
  });

  afterAll(async (done) => {
    done();
  });
});
