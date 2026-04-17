import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  if(!process.env.JWT_SECRET){
    throw new Error('JWT_SECRET est manquant')
  }

  if(!process.env.DATABASE_URL){
    throw new Error('DATABASE_URL est manquant')
  }

  if(!process.env.FRONTEND_URL){
    throw new Error('FRONTEND_URL est manquant')
  }
  
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })

  // Durcit l'app contre certaines attaques/comportements risqués
  app.use(helmet())

  // Active les validationDto dans toute l'app
  app.useGlobalPipes(
    new ValidationPipe({
      // Supprime tout ce qui n'est pas dans le DTO
      whitelist: true,
      // Erreur en cas de champs interdit
      forbidNonWhitelisted: true,
      // Transforme les données quand c'est utile
      transform: true
    })
  )

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
