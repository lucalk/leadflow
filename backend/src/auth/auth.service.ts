import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) {}

    async login(dto: LoginDto){
        const admin = await this.prisma.admin.findUnique({ where: { email : dto.email }})

        if(!admin){
            throw new UnauthorizedException("Identifiants invalides")
        }

        const isPasswordValid = await bcrypt.compare(dto.password, admin.passwordHash)

        if(!isPasswordValid){
            throw new UnauthorizedException("Identifiants invalides")
        }

        const payload = {
            sub: admin.id,
            email: admin.email
        }

        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }

    async validateAdmin(adminId: number){
        return this.prisma.admin.findUnique({
            where: { id: adminId },
            select: { id: true, email: true }
        })
    }
}
