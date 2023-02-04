import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { CreateTicketDTO } from './dtos/create-ticket.dto';
import { TicketService } from './ticket.service';

@Controller('ticket')
@UseGuards(JwtAuthGuard)
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get('/me')
  getMy(@Request() req: any) {
    return this.ticketService.findTicketByUser(req.user.id);
  }

  @Post()
  create(@Request() req: any, @Body() createTicketDto: CreateTicketDTO) {
    return this.ticketService.create(req.user.id, createTicketDto);
  }

  @Patch('/change-visibility/:id')
  changeVisibility(@Param('id') id: number) {
    return this.ticketService.changeVisibility(id);
  }
}
