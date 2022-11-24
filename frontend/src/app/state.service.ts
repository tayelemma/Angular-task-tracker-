import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IGoal, IState, IStep } from './goal.interface';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  goals!: IGoal[];
  steps!: IStep[];

  state: BehaviorSubject<IState> = new BehaviorSubject<IState>({
    _id: '',
    email: '',
    fullname: '',
    token: '',
  });
  constructor() {}
}
