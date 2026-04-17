import { Controller, Body, Get, Post, UseGuards } from '@nestjs/common';
import { ContactRequestsService } from './contact-requests.service';
import { CreateContactRequestDto } from './dto/create-contact-request.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('contact-requests')
export class ContactRequestsController {
    constructor(private readonly contactRequestsService: ContactRequestsService) {}

    @Post()
    create(@Body() dto: CreateContactRequestDto){
        return this.contactRequestsService.create(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('admin')
    findAll(){
        return this.contactRequestsService.findAll()
    }
}
