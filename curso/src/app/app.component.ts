import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'world';
   cont: number = 0;

  // mal = kk
  /**
   *
   */
  constructor() {
    let otro: number = 0;
      otro = 2;

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
