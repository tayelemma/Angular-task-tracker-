import { Component, inject, Input, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { GoalService } from './goal.service';
import { ToastrService } from 'ngx-toastr';
import { IStep } from '../goal.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-step-list',
  template: `
    <div class="container">
      <div
        style="border: 2px solid black; background-color: MintCream;"
        class="card"
      >
        <div class="card-content">
          <p class="title">{{ index + 1 }}. {{ step.title }}</p>
          <hr />
          <p><strong>Description:</strong> {{ step.description }}</p>
          <p><strong>Status:</strong> {{ step.status }}</p>
          <p [appPastDue]="dueDate">
            <strong>Deadline:</strong> {{ step.deadline }} days
          </p>
          <p>
            <strong>Date Created:</strong>
            {{ step.dateCreated | date: 'dd-MM-yyyy' }}
          </p>
          <p>
            <strong>Todays Date:</strong> {{ dateNow | date: 'dd-MM-yyyy' }}
          </p>
        </div>
        <footer class="card-footer" style="background-color: black;">
          <p class="card-footer-item">
            <span>
              <a
                [routerLink]="['', 'goals', goalId, 'steps', step._id]"
                style="color: white"
                >Edit</a
              >
            </span>
          </p>
          <p class="card-footer-item">
            <a (click)="deleteHandler(step._id)" style="color: white">
              Delete
            </a>
          </p>
        </footer>
      </div>
    </div>
    <br />
  `,
  styles: [
    `
      .container {
        width: 60%;
      }
      .main {
        width: 90%;
        margin: auto;
      }
      .th {
        background-color: black;
        color: white;
      }
    `,
  ],
})
export class StepListComponent implements OnInit {
  dateNow = new Date();
  @Input() step!: IStep;
  @Input() index!: number;
  @Input() steps!: IStep[];
  @Input() goalId!: string;
  @Input() dueDate!: number;
  private toster = inject(ToastrService);
  private goalService = inject(GoalService);
  private stateService = inject(StateService);

  constructor() {}

  ngOnInit(): void {
    let create = new Date(this.step.dateCreated);
    if (
      this.step.status.toLocaleLowerCase().includes('on progress') ||
      this.step.status.toLocaleLowerCase().includes('not started')
    ) {
      this.dueDate =
        this.step.deadline -
        Math.floor(
          Date.UTC(
            this.dateNow.getFullYear(),
            this.dateNow.getMonth(),
            this.dateNow.getDate()
          ) -
            Date.UTC(create.getFullYear(), create.getMonth(), create.getDate())
        ) /
          (1000 * 60 * 60 * 24);
    }
  }

  deleteHandler(step_id: string) {
    this.goalService
      .deleteStepById(this.goalId, step_id)
      .subscribe((response) => {
        this.toster.success('Deleted successfully!');
        console.log(this.stateService.steps);

        this.stateService.steps = this.stateService.steps.splice(
          this.stateService.steps.indexOf(this.step, 1)
        );
      });
  }
}
