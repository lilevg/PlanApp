import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}
  async sendEmail(user: User) {
    try {
      const emailSend = await this.mailerService
        .sendMail({
          to: user.email,
          subject: 'Welcome to Our Community',
          template: 'confirmation', // `.hbs` extension is appended automatically
          context: {
            name: user.name,
          },
        })
        .catch((e) => console.log('Error: ', e));
      return emailSend;
    } catch (error) {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
