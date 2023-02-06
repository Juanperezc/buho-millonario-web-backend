import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async resetPasswordMail(name: string, email: string, token: string) {
    const url = `${this.configService.get(
      'FRONTEND_URL',
    )}/reset-password?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Restablecer contraseña',
      template: './reset-password', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: name,
        url,
      },
    });
  }
}
