import { Component, OnInit, inject } from '@angular/core';
import { StateService } from '../state.service';
import { GoalService } from './goal.service';
import { FormBuilder,} from '@angular/forms';
import { IGoal } from '../goal.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  template: `
    <div class="container">
      <h1 class="m-2" style="font-size: 20px; font-weight: bolder">
        Add New Goal
      </h1>
      <form [formGroup]="form" (ngSubmit)="submit()" class="form">
        <input 
         placeholder="title" 
         formControlName="title" 
         class="input m-2" />

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
        <button 
           class="button m-2 is-warning"
            type="submit">
            Save goal
          </button>
      </form>
    </div>
  `,
  styles: [
    `
      .container {
        border: 1px solid balck;
        padding: 50px;
        width: 80%;
        background-color: white;
        margin-bottom: 50px;
      }
    `,
  ],
})
export class GoalAddComponent implements OnInit {
  goals!: IGoal;
  userId!: string;
  private router = inject(Router);
  private toster = inject(ToastrService);
  private goalServide = inject(GoalService);
  private stateServide = inject(StateService);

  form = inject(FormBuilder).nonNullable.group({
    title: '',
    description: '',
    deadline: '',
  });

  constructor() {
    this.stateServide.state.subscribe((res) => {
      this.userId = res._id;
      console.log(this.userId)
    });
  }

  ngOnInit(): void {}

  submit() {
    let copyForm = { ...this.form.value, userId: this.userId };
    console.log(copyForm)
    this.goalServide
      .addGoals(
        copyForm as {
          userId: string;
          title: string;
          description: string;
          deadline: string;
        }
      )
      .subscribe((response) => {
        this.toster.success('Added successfully');
        this.router.navigate(['', 'goals', 'lists']);
      });
  }
}
