import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactRequestDto } from './dto/create-contact-request.dto';

@Injectable()
export class ContactRequestsService {
    constructor(private readonly prisma: PrismaService) {}

    // Création d'une demande
    async create(dto: CreateContactRequestDto){
        return this.prisma.contactRequest.create({
            data: {
                name: dto.name,
                email: dto.email,
                message: dto.message
            },
            select: {
                id: true,
                name: true,
                email: true,
                message: true,
                createdAt: true
            }
        })
    }

    // Toutes les demandes
    async findAll(){
        return this.prisma.contactRequest.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                name: true,
                email: true,
                message: true,
                createdAt: true
            }
        })
    }
}
