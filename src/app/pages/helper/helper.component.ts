import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-helper',
  templateUrl: './helper.component.html',
  styleUrls: ['./helper.component.css']
})
export class HelperComponent implements OnInit {
  title = 'mock-privilege';

  constructor() { }

  ngOnInit(): void {
  }

}
