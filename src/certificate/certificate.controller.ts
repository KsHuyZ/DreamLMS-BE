import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { AuthGuard } from '@nestjs/passport';

@Controller({ path: 'certificate', version: '1' })
export class CertificateController {
  constructor(private certificateService: CertificateService) {}
  @Get('course/:id')
  getCertificateByCourse(@Param(':id') courseId: string) {
    return this.certificateService.getCertificateByCourseId(courseId);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getCertificateByUserId(@Request() request) {
    const userId = request.user.id;
    return this.certificateService.getCertificateByUserId(userId);
  }

  @Get(':courseId/:userId')
  getCertificateByUserIdAndCourseId(
    @Param('courseId') courseId: string,
    @Param('userId') userId: string,
  ) {
    return this.certificateService.getCertificateByUserIdAndCourseId(
      userId,
      courseId,
    );
  }

  @Post(':courseId')
  @UseGuards(AuthGuard('jwt'))
  createCertificate(@Request() request, @Param('courseId') courseId: string) {
    const userId = request.user.id;
    return this.certificateService.createCertificate(userId, courseId);
  }
}
