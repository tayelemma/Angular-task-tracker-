import { Component, DoCheck, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../state.service';
import { GoalService } from './goal.service';
import { Subscription, map } from 'rxjs';
import { IStep } from '../goal.interface';

@Component({
  selector: 'app-steps-list',
  template: `
    <div class="container is-max-widescreen">
      <div class="notification  " style="font-size: 40px; font-weight: bolder">
        List of steps
      </div>
    </div>
    <button
      class="button is-info is-outlined is-fullwidth container"
      [routerLink]="['', 'goals', this.goalId, 'steps', 'add']"
      style="border: 2px solid black; color: black; font-weight: bold"
    >
      Add a new steps
    </button>
    <br />
    <div
    *ngFor="let step of steps; index as i"
    >
      <app-step-list
        [index]="i"
        [steps]="steps"
        [step]="step"
        [goalId]="goalId"
      >
      </app-step-list>
    </div>

  `,
  styles: [
    `
      .container {
        width: 60%;
        margin: auto;
      }
    `,
  ],
})export class StepsListComponent implements OnInit, OnDestroy{
  dueDate!: number;
  steps!: IStep[];
  goalId!: string;
  dateNow = Date();
  subscription!: Subscription;
  private goalService = inject(GoalService);
  private stateService = inject(StateService);
  private activatedRouter = inject(ActivatedRoute);

  constructor() {
    this.subscription = this.activatedRouter.paramMap
      .pipe(map((params) => params.get('goal_id') as string))
      .subscribe((response) => {
        this.goalId = response;
      });
    this.subscription = this.goalService
      .getAllSteps(this.goalId)
      .subscribe((response) => {
        this.steps = response.data;
        this.stateService.steps = response.data
        localStorage.setItem('STEPS', JSON.stringify(response.data));
        console.log(this.steps, 'stes from steps list');
      });
  }
  ngOnInit(): void {}
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
