import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ListComponent } from './list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GoalAddComponent } from './goal-add.component';
import { PastDueDirective } from './past-due.directive';
import { StepAddComponent } from './step-add.component';
import { StepListComponent } from './step-list.component';
import { GoalListComponent } from './goal-list.component';
import { StepsListComponent } from './steps-list.component';
import { StepUpdateComponent } from './step-update.component';
import { GoalUpdateComponent } from './goal-update.component';

@NgModule({
  declarations: [
    GoalListComponent,
    GoalAddComponent,
    GoalUpdateComponent,
    StepListComponent,
    StepAddComponent,
    StepUpdateComponent,
    ListComponent,
    PastDueDirective,
    StepsListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'lists', component: ListComponent },
      { path: 'add/:user_id', component: GoalAddComponent },
      { path: ':goal_id/update', component: GoalUpdateComponent },
      { path: 'lists/:goal_id/steps', component: StepsListComponent },
      { path: ':goal_id/steps/add', component: StepAddComponent },
      { path: ':goal_id/steps/:step_id', component: StepUpdateComponent },
    ]),
  ],
})
export class GoalModule {}
