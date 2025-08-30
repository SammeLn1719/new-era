import { Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'argon2';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { PomodoroDto, PomodoroRoundDto } from './dto/pomodoroRound.dto';

import { startOfDay, endOfDay, subDays } from 'date-fns';
import { PomodoroSessionDto } from './dto/pomodoroSession.dto';

@Injectable()
export class PomodoroService {
    constructor(private prisma: PrismaService) {}

    async getTodaySessions(userId: string) {
        const today = new Date().toISOString().split('T')[0];

        return this.prisma.pomodoroSession.findFirst({
            where: {
                createdAt: {
                    gte: new Date(today)
                },
                userId
            },
            include: {
                rounds: {
                    orderBy: {
                        id: 'desc'
                    }
                }
            }
        })
    }

    async create( userId: string) {
        const todaySession = await this.getTodaySessions(userId);

        if(todaySession) return todaySession;

        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                intervalsCounter: true
            }
        })

        if(!user) throw new NotFoundException('User not found');

        return this.prisma.pomodoroSession.create({
            data: {
                rounds: {
                    createMany: {
                        data: Array.from({length: user.intervalsCounter}, () => ({
                            totalSeconds: 0
                        })
                    }
                }
                user:{
                    connect: {
                        id: userId
                    }
                }
                include: {
                    rounds: true
                }
            }
        })
    }
    
    async update(
        dto: Partial<PomodoroSessionDto>,
        pomodoroId: string,
        userId: string) {
            return this.prisma.pomodoroSession.update({
                where: {
                    userId,
                    id: pomodoroId,
                },
                data: dto
            })
        }

    async updateRound(dto: Partial<PomodoroRoundDto>, roundId: string) {
        return this.prisma.pomodoroRound.update({
            where:{
                id: roundId,
            },
            data: dto,
        })
    }
    async delete(sessionId: string, userId: string) {
        return this.prisma.pomodoroSession.delete({
            where: {
                id: sessionId,
                userId
            }
        })
    }
}
