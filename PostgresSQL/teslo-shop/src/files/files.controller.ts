import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';
import { fileNamer, fileFilter } from './helpers';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService) {}

  @Get('product/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string,
  ) {
    const path = this.filesService.getStaticProductImage(imageName);

    // res.status(403).json({
    //   ok: false,
    //   path: path
    // })

    res.sendFile(path);

    return path;
  }

  @Post('product')
  @UseInterceptors(
    FileInterceptor(
      'file',

      {
        fileFilter: fileFilter,
        //limits: {fileSize:1000} se puede colocar el tamañp de archivos a cargar
        storage: diskStorage({
          destination: './static/uploads',
          filename: fileNamer,
        }),
      },
    ),
  ) // Se coloca el nombre de como se recibira el archivo
  uploadProductImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Make sure that th files is an image');
    }

    // Almacenamos el nombre del archivo
    //const secureUrl = `${file.filename}`;
    const secureUrl = `${this.configService.get('HOST_API')}/files/product/${file.filename}`;

    return {
      // fileName: file.originalname,

      // retornamos el nombre
      secureUrl,
    };
  }
}
