import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoalService } from './goal.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IStep } from '../goal.interface';
import { map } from 'rxjs';

@Component({
  selector: 'app-add',
  template: `
    <div class="container">
      <h1 class="m-2" style="font-size: 20px; font-weight: bolder">
        Add new steps
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
        <button class="button m-2 is-warning" type="submit">Save steps</button>
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
export class StepAddComponent implements OnInit {
  step!: IStep;
  goalId!: string;
  private router = inject(Router);
  private toster = inject(ToastrService);
  private goalServide = inject(GoalService);
  private activatedRoute = inject(ActivatedRoute);

  form = inject(FormBuilder).nonNullable.group({
    title: '',
    description: '',
    status: '',
    deadline: '',
  });

  constructor() {
    this.activatedRoute.paramMap
      .pipe(map((params) => params.get('goal_id') as string))
      .subscribe((response) => {
        this.goalId = response;
      });
    console.log(this.goalId);
  }

  ngOnInit(): void {}

  submit() {
    this.goalServide
      .addSteps(
        this.form.value as {
          title: string;
          description: string;
          status: string;
          deadline: string;
        },
        this.goalId as string
      )
      .subscribe((response) => {
        this.toster.success('Added successfully!');
        this.router.navigate(['', 'goals', 'lists', this.goalId, 'steps']);
      });
  }
}
