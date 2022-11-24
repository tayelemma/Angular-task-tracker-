import { Component, inject, Input, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { GoalService } from './goal.service';
import { ToastrService } from 'ngx-toastr';
import { IGoal } from '../goal.interface';


@Component({
  selector: 'app-goal-list',
  template: `
    <div class="container">
      <div style="border: 2px solid black; background-color:powderblue" class="card" >
        <div class="card-content">
          <p class="title">{{index+1 }}. {{ goal.title }}</p>
          <hr />
          <p><strong>Description:  </strong> {{ goal.description }}</p>
          <p><strong>Date Created:  </strong>  {{ goal.createdAt | date:'dd-MM-yyyy' }}</p>
          <p><strong>Deadline:  </strong> {{ goal.deadline }} days</p>
           
          <br />
          <span><strong>Overall Progress:  </strong> </span>
          
          <progress
            value="{{ calculatedPercent }}"
            min="0"
            max="100"
          ></progress>
          <span> {{ calculatedPercent | number: '1.0-2' }}%</span>
        </div>
        <footer class="card-footer" style="background-color: black;">
          <p class="card-footer-item ">
            <span>
              <a [routerLink]="['', 'goals', 'lists', goal._id, 'steps']">
                View Steps</a
              >
            </span>
          </p>

          <p class="card-footer-item">
            <span>
              <a [routerLink]="['', 'goals', goal._id, 'update']">Edit</a>
            </span>
          </p>
          <p class="card-footer-item">
            <a (click)="deleteHandler(goal._id)"> Delete </a>
          </p>
        </footer>
      </div>
    </div>
    <br />

    <br />
  `,
  styles: [
    `
      .card {
        margin-bottom: 10px;
      }
      .container {
        width: 80%;
        margin: auto;
      }
      a {
        color: white;
      }
    `,
  ],
})
export class GoalListComponent implements OnInit {
  @Input() goal!: IGoal;
  @Input() index!:number;
  @Input() goals!: IGoal[];
  @Input() userId!: string;
  calculatedPercent!: number;
  private toster = inject(ToastrService);
  private goalService = inject(GoalService);
  private stateService = inject(StateService);
  
  constructor() { }

  ngOnInit(): void {
   
    const valueFil = this.goal.steps.filter((f) =>
      f.status.toLowerCase().includes('completed')
    );
    if (valueFil) {
      console.log(valueFil);
    }
    if (valueFil.length <= 0 && this.goal.steps.length <= 0) {
      this.calculatedPercent = 0;
    } else {
      this.calculatedPercent = (valueFil.length / this.goal.steps.length) * 100;
    }
  }

  deleteHandler(goal_id: string) {
    this.goalService.deleteGoalById(goal_id).subscribe((response) => {
      this.toster.success('Deleted successfully!');
      this.stateService.goals = this.stateService.goals.splice(
        this.stateService.goals.indexOf(this.goal, 1))
    });
  }
}
