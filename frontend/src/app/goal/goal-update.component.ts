import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GoalService } from './goal.service';
import { FormBuilder} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IGoal} from '../goal.interface';
import { map } from 'rxjs';

@Component({
  selector: 'app-add',
  template: `
    <div class="container">
      <h1 class="m-2" style="font-size: 20px; font-weight: bolder">
        Edit Goal
      </h1>
      <form [formGroup]="form" (ngSubmit)="submit()" class="form">
        <input placeholder="title" formControlName="title" class="input m-2" />

        <textarea
          formControlName="description"
          class="textarea m-2"
          placeholder="description"
        ></textarea>
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
        border: 1px solid balck;
        padding: 50px;
        width: 90%;
        background-color: white;
        margin-bottom: 50px;
      }
    `,
  ],
})
export class GoalUpdateComponent implements OnInit {
  goal_id!: string;
  goals: IGoal[] = [];
  private router = inject(Router);
  private toster = inject(ToastrService);
  private goalServide = inject(GoalService);
  private activatedRoute = inject(ActivatedRoute);

  form = inject(FormBuilder).nonNullable.group({
    title: '',
    description: '',
    deadline: '',
  });

  constructor() {
    this.activatedRoute.paramMap
      .pipe(map((params) => params.get('goal_id') as string))
      .subscribe((response) => {
        this.goal_id = response;
      });
  }
  ngOnInit(): void {
    this.goalServide.getGoalById(this.goal_id).subscribe((response) => {
      const { data: goal } = response;
      this.form.patchValue(goal);
      console.log(response);
    });
    console.log(this.goal_id);
  }

  submit() {
    this.goalServide
      .updateGoals(
        this.form.value as {
          userId: string;
          title: string;
          description: string;
          deadline: string;
        },
        this.goal_id
      )
      .subscribe((response) => {
        this.toster.success('Updated successfully');
        this.router.navigate(['', 'goals', 'lists']);
      });
  }
}
