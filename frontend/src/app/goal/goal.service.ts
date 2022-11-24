import { environment } from '../../environments/environment';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGoal, IStep } from '../goal.interface';

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  private http = inject(HttpClient);

  constructor(private client: HttpClient) {}

  getGoals(user_id: string) {
    return this.http.get<{ data: IGoal[] }>(
      environment.server + `/goals/` + user_id + `/goals`
    );
  }

  addGoals(goal: {
    userId: string;
    title: string;
    description: string;
    deadline: string;
  }) {
    return this.http.post<{ success: boolean }>(
      environment.server + '/goals/' + goal.userId,
      goal
    );
  }

  getGoalById(goal_id: string) {
    return this.http.get<{
      data: {
        userId: string;
        title: string;
        description: string;
        deadline: string;
      };
    }>(environment.server + '/goals/' + goal_id);
  }

  updateGoals(
    goal: {
      userId: string;
      title: string;
      description: string;
      deadline: string;
    },
    goal_id: string
  ) {
    return this.http.patch<{ success: boolean }>(
      environment.server + '/goals/' + goal_id + '/update',
      goal
    );
  }

  deleteGoalById(goal_id: string) {
    return this.http.delete<{ success: boolean }>(
      environment.server + '/goals/' + goal_id
    );
  }
 
  getAllSteps(goal_id: string) {
    return this.http.get<{ data: IStep[] }>(environment.server + `/goals/lists/` + goal_id + `/steps`);
  }
  
  addSteps(
    step: {
      title: string;
      description: string;
      status: string;
      deadline: string;
    },
    goal_id: string
  ) {
    return this.http.patch<{ success: boolean }>(
      environment.server + '/goals/' + goal_id + '/add_steps',
      step
    );
  }

  getStepById(goal_id: string, step_id: string) {
    return this.http.get<{
      data: [
        {
          title: string;
          description: string;
          status: string;
          deadline: string;
          dateCreated: string;
        }
      ];
    }>(environment.server + '/goals/' + goal_id + '/steps/' + step_id);
  }

  updateSteps(
    step: {
      title: string;
      description: string;
      status: string;
      deadline: string;
    },
    goal_id: string,
    step_id: string
  ) {
    return this.http.patch<{ success: boolean }>(
      environment.server + '/goals/' + goal_id + '/steps/' + step_id,
      step
    );
  }

  deleteStepById(goal_id: string, step_id: string) {
    return this.http.delete<{ success: boolean }>(
      environment.server + `/goals/${goal_id}/steps?step_id=${step_id} `
    );
  }
}
