import nodemailer from "nodemailer";
import { smtpUser, smtpPassword, smtpService, smtpSender } from "../config";

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: smtpService,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });
  }

  async sendEmail(to: string, subject: string, content: string): Promise<void> {
    const mailOptions: any = {
      from: smtpSender,
      to,
      subject,
      html: content,
    };
    try {
      const data = await this.transporter.sendMail(mailOptions);
    } catch (error: any) {
      console.log("Failed to send email", error);
      //throw new Error("Failed to send email", error);
    }
  }

  async sendMultipleEmails(
    to: string[],
    subject: string,
    content: string
  ): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: smtpSender,
      to: to.join(", "), // Join multiple recipients with commas
      subject: subject,
      html: content,
    };
    try {
      const data = await this.transporter.sendMail(mailOptions);
      console.log("Email sent:", data);
    } catch (error: any) {
      console.log("Failed to send email", error);
      //throw new Error(`Failed to send email: ${error}`);
    }
  }
}
