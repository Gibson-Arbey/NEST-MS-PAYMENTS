import { Controller, } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentSessionDto } from './dto/payment-session.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern({ cmd: 'payment_order' })
  createPaymentSession(@Payload() paymentSessionDto: PaymentSessionDto ) {
    return this.paymentsService.createPaymentSession(paymentSessionDto);
  }

  @MessagePattern({ cmd: 'success_order' })
  success() {
    return {
      ok: true,
      message: 'Orden pagada correctamente'
    }
  }

  @MessagePattern({ cmd: 'cancel_order' })
  cancel() {
    return {
      ok: false,
      message: 'Orden cancelada'
    }
  }
}
