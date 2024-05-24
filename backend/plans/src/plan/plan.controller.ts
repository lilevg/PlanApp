import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Plan } from './entities/plan.entity';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post(':userId')
  create(
    @Body() createPlanDto: CreatePlanDto,
    @Param('userId') userId: string,
  ) {
    return this.planService.create(createPlanDto, userId);
  }

  @Get(':userId')
  async findAllUsersPlans(@Param('userId') userId: string) {
    return await this.planService.findAllUsersPlans(userId);
  }

  @Get(':userId/:planId')
  async findOne(
    @Param('userId') userId: string,
    @Param('planId') planId: string,
  ): Promise<Plan> {
    return await this.planService.findOne(userId, planId);
  }

  // @Get('today/:userId')
  // async getAllToday(@Param('userId') userId: string){
  //   console.log(77777777);
  //   return await this.planService.getAllToday(userId);
  // }

  @Patch(':userId/:planId')
  async update(
    @Param('planId') planId: string,
    @Param('userId') userId: string,
    @Body() updatePlanDto: UpdatePlanDto,
  ) {
    return await this.planService.update(planId, userId, updatePlanDto);
  }

  @Delete(':userId/:planId')
  async remove(
    @Param('planId') planId: string,
    @Param('userId') userId: string,
  ) {
    return await this.planService.remove(planId, userId);
  }
}
