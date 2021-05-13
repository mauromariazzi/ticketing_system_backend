import { IsNotEmpty } from 'class-validator';

export class TicketDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly due_date: Date;

  @IsNotEmpty()
  readonly status: string;

  @IsNotEmpty()
  readonly username: string;
}
