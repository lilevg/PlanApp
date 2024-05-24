import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from './entities/plan.entity';
import { Repository, Like } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import {isLogLevelEnabled} from "@nestjs/common/services/utils";

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan) private readonly planRepository: Repository<Plan>,
    private readonly httpService: HttpService,
  ) {}
  async create(createPlanDto: CreatePlanDto, userId: string): Promise<Plan> {
    const user = this.getUser(userId);
    console.log(createPlanDto)
    if (!user) {
      throw new ConflictException('Username already exists');
    }
    const title = createPlanDto.plan_title;
    const existThisPlanTitle = await this.planRepository.findOne({
      where: { plan_title: title },
    });
    if (existThisPlanTitle) {
      const similarTitles = await this.planRepository.find({
        where: [
          { plan_title: Like(`${title} %`) },
          { plan_title: Like(`${title}%`) },
        ],
      });

      similarTitles.sort((a, b) => {
        const matchA = a.plan_title.match(/\((\d+)\)$/);
        const matchB = b.plan_title.match(/\((\d+)\)$/);

        const numA = matchA ? +matchA[1] : 0;
        const numB = matchB ? +matchB[1] : 0;

        return numB - numA;
      });

      const lastTitle = similarTitles[0];
      const regex = /.*\((\d+)\)$/;
      const match = lastTitle.plan_title.match(regex);
      let number = 0;

      if (match && match.length > 1) {
        number = +match[1];
      }

      const editTitle = `${title} (${++number})`;
      const newPlan1 = this.planRepository.create({
        plan_title: editTitle,
        description: createPlanDto.description,
        userId: userId,
      });
      const plan1 = await this.planRepository.save(newPlan1);
      return plan1;
    }
    const newPlan = this.planRepository.create({
      ...createPlanDto,
      userId: userId,
    });
    const plan = await this.planRepository.save(newPlan);
    console.log(plan)
    return plan;
  }

  async findAllUsersPlans(userId: string) {
    const user = await this.getUser(userId);
    if (!user) {
      throw new ConflictException('Username already exists');
    }
    const t = await this.planRepository.find({
      where: { userId: userId },
      order: { plan_title: 'DESC' },
    });
    return t;
  }

  async findOne(userId: string, planId: string): Promise<Plan> {
    const user = this.getUser(userId);
    if (!user) {
      throw new ConflictException('Username already exists');
    }
    return await this.planRepository.findOne({
      where: { userId: userId, id: planId },
    });
  }

  async update(planId: string, userId: string, updatePlanDto: UpdatePlanDto) {
    // Find the plan by planId and userId
    const plan = await this.planRepository.findOne({
      where: { id: planId, userId },
    });

    // Throw a NotFoundException if the plan is not found
    if (!plan) {
      throw new NotFoundException(`Plan with ID ${planId} not found`);
    }

    // Update the plan properties
    // Assuming updatePlanDto has properties like title, start_time, end_time, description, importance, completed
    if (updatePlanDto.plan_title) {
      plan.plan_title = updatePlanDto.plan_title;
    }
    if (updatePlanDto.start_time) {
      plan.start_time = updatePlanDto.start_time;
    }
    if (updatePlanDto.end_time) {
      plan.end_time = updatePlanDto.end_time;
    }
    if (updatePlanDto.description) {
      plan.description = updatePlanDto.description;
    }
    if (updatePlanDto.importance) {
      plan.importance = updatePlanDto.importance;
    }
    if (updatePlanDto.completed !== undefined) {
      plan.completed = updatePlanDto.completed;
    }

    // Save the changes to the database
    return this.planRepository.save(plan);
  }

  async remove(id: string, userId: string): Promise<void> {
    const user = this.getUser(userId);
    if (user) {
      await this.planRepository.delete(id);
    } else {
      throw new ConflictException('You can`t delete not yours plans');
    }
  }

  private async getUser(userId: string): Promise<any> {
    try {
      const response = await this.httpService
        .get(`http://localhost:8000/user/${userId}`)
        .toPromise();
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error.response.data);
      throw new InternalServerErrorException();
    }
  }

  // async getAllToday(userId: string): Promise<Plan[]> {
  //   // Отримуємо поточну дату
  //   const today = new Date();
  //
  //   // Отримуємо початок сьогоднішнього дня
  //   const startOfDay = new Date(today);
  //   startOfDay.setHours(0, 0, 0, 0);
  //
  //   // Отримуємо кінець сьогоднішнього дня
  //   const endOfDay = new Date(today);
  //   endOfDay.setHours(23, 59, 59, 999);
  //
  //   // Знаходимо всі плани, які починаються протягом сьогоднішнього дня
  //   const plans = await this.planRepository.find({
  //     where: {
  //       userId: userId,
  //       start_time: startOfDay,
  //       end_time: endOfDay,
  //     },
  //   });
  //   console.log(plans)
  //   return plans;
  // }
}
