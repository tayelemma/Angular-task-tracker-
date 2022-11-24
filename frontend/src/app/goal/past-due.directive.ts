import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appPastDue]'
})

export class PastDueDirective implements OnInit {

  @Input('appPastDue') dueDate!:number;
  @HostBinding('style.background-color') pastDueColor: string = 'MintCream'

  constructor() {}

  ngOnInit(): void {
    if(this.dueDate <= 0)
    this.pastDueColor = 'gold';
  }
}
