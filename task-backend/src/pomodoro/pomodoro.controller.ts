import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UsePipes, HttpCode, Put, ValidationPipe } from '@nestjs/common';
import { TaskService } from './pomodoro.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { PomodoroDto, PomodoroRoundDto } from './dto/pomodoroRound.dto';

@Controller('user/timers/')
export class PomodoroController {
  constructor(private readonly pomodoroService: PomodoroService) {}

  @Get('today')
  @Auth()
  async getTodaySessions(@CurrentUser('id') userId: string) {
    return this.pomodoroService.getTodaySessions(userId)
  }

  @HttpCode(200)
  @Post()
  @Auth()
  async create(@CurrentUser('id') userId: string) {
    return this.pomodoroService.create(userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('/round/:id')
  @Auth()
  async updateRound(
    @Param('id') id: string,
    @Body() dto: PomodoroRoundDto,
    @CurrentUser('id') userId: string) {
    return this.pomodoroService.updateRound(dto, id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async update(
    @Param('id') id: string,
    @Body() dto: PomodoroDto,
    @CurrentUser('id') userId: string) {
    return this.pomodoroService.update(dto, id, userId)
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.pomodoroService.delete(id, userId)
  }
}