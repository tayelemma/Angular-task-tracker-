import { Component, inject, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { GoalService } from './goal.service';
import { IGoal} from '../goal.interface';

@Component({
  selector: 'app-list',
  template: `
  <div class="container is-max-widescreen" >
      <div class="notification" style="font-size: 40px; font-weight: bolder">
        List of goals
      </div>
    </div>
    <button
    [routerLink]="['', 'goals', 'add', userId]"
      class="button is-link is-outlined is-fullwidth container"
      style="border: 2px solid black; color: black; font-weight: bold"
    >
      Add a new Goal
    </button>
    <br>

    <app-goal-list *ngFor="let goal of goals; index as i" [goal]="goal" [index]='i'  [userId] = 'userId'> </app-goal-list>
  `,
  styles: [
    `
      .container {
        width: 80%;
        margin: auto;
      }
    `,
  ],
})
export class ListComponent implements OnInit {
  goals!: IGoal[];
  userId: string = '';
  private goalService = inject(GoalService);
  private stateService = inject(StateService);

  constructor() {
    this.stateService.state.subscribe((res) => {
      this.userId = res._id;
    });
  }

  ngOnInit(): void {
    this.goalService.getGoals(this.userId).subscribe((response) => {
      this.goals = response.data;
      localStorage.setItem("GOAL", JSON.stringify(response.data));
      this.stateService.goals = response.data;  
    });
    
  }
}