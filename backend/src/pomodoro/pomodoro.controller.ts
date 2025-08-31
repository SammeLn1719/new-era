import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UsePipes, HttpCode, Put, ValidationPipe } from '@nestjs/common';
import { PomodoroService } from './pomodoro.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { PomodoroRoundDto } from './dto/pomodoroRound.dto';
import { PomodoroSessionDto } from './dto/pomodoroSession.dto';

@Controller('user/timer/')
export class PomodoroController {
  constructor(private readonly pomodoroService: PomodoroService) {}

  @Get('today')
  @Auth()
  async getTodaySessions(@CurrentUser('id') userId: string) {
    return this.pomodoroService.getTodaySession(userId)
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
    @Body() dto: PomodoroSessionDto,
    @CurrentUser('id') userId: string) {
    return this.pomodoroService.update(dto, id, userId)
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.pomodoroService.deleteSession(id, userId)
  }
}