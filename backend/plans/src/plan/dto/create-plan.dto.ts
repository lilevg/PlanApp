import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Importance } from './importance.enum';

export class CreatePlanDto {
  @IsNotEmpty()
  @IsString()
  plan_title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsDate()
  start_time: Date;

  @IsDate()
  end_time: Date;

  @IsEnum({ type: 'enum', enum: Importance })
  importance: Importance;

  @IsBoolean()
  completed: boolean;
}
