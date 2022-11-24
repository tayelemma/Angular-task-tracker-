import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div id="main" >
      <img src="../assets/img1.PNG" alt="" >
      <p style="font-size: 30px, font-weight: bold ;">Goal Tracker</p>
    </div>
  `,
  styles: [
    `
        img{
          width: 200px;
          height: 200px;
          margin: auto;
        }
      #main {
        width: 100%;
        height: 600px;
        color: black;
        font-size: 100px;
        font-weight: bolder;
        border-radius: 50px;
        background-color: white;
      }
    `,
  ],
})
export class HomeComponent{}
