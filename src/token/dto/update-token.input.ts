import { CreateTokenInput } from './create-token.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTokenInput extends PartialType(CreateTokenInput) {
  id: number;
}
