import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, map, mergeMap } from 'rxjs';
import { GoalService } from './goal.service';
import {FormBuilder} from '@angular/forms';
import { IStep } from '../goal.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add',
  template: `
    <div class="container">
      <h1 class="m-2" style="font-size: 20px; font-weight: bolder">
        Edit steps
      </h1>
      <form [formGroup]="form" (ngSubmit)="submit()" class="form">
        <input placeholder="title" formControlName="title" class="input m-2" />
        <textarea
          formControlName="description"
          class="textarea m-2"
          placeholder="description"
        ></textarea>

        <select formControlName= "status" style="height: 40px; width: 100%" class="m-2">
          <option selected >not started</option>
          <option>completed</option>
          <option>on progress</option>
        </select>

        <input
          placeholder="deadline"
          formControlName="deadline"
          class="input m-2"
        />
        <button class="button m-2 is-warning" type="submit">Update</button>
      </form>
    </div>
  `,
  styles: [
    `
      .container {
        width: 80%;
      }
    `,
  ],
})
export class StepUpdateComponent implements OnInit, OnDestroy {
  step!: IStep;
  goalId!: string;
  stepId!: string;
  subscription!: Subscription;
  private router = inject(Router);
  private toster = inject(ToastrService);
  private goalService = inject(GoalService);
  private formBuilder = inject(FormBuilder);
  private activatedRouter = inject(ActivatedRoute);

  form = this.formBuilder.nonNullable.group({
    title: '',
    description: '',
    status: '',
    deadline: '',
  });

  constructor() {
    this.activatedRouter.paramMap
      .pipe(map((parmas) => parmas.get('goal_id') as string))
      .subscribe((goal_id) => {
        this.goalId = goal_id;
        console.log(this.goalId);
      });
    this.activatedRouter.paramMap
      .pipe(map((parmas) => parmas.get('step_id') as string))
      .subscribe((step_id) => {
        this.stepId = step_id;
        console.log(this.stepId);
      });

    this.goalService
      .getStepById(this.goalId, this.stepId)
      .subscribe((response) => {
        console.log(response);
        const { data: steps } = response;
        steps.map((m) => {
          this.form.patchValue({
            title: m.title,
            description: m.description,
            status: m.status,
            deadline: m.deadline,
          });
        });
      });
  }

  ngOnInit(): void { }

  submit() {
    this.goalService
      .updateSteps(
        this.form.value as {
          title: string;
          description: string;
          status: string;
          deadline: string;
        },
        this.goalId,
        this.stepId
      )
      .subscribe((response) => {
        this.toster.success('Updated successfully');
        this.router.navigate(['', 'goals', 'lists', this.goalId, 'steps']);
      });
  }
  ngOnDestroy(): void {}
}
