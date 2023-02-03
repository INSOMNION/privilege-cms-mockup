import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit {

  current: number = 0
  list: string[] = []

  ngOnInit(): void {
    for (let i = 1; i <= 10; i++) {
      this.list.push(`item-${i}`)
    }
  }

  start (event: DragEvent, index: number): void {
    console.log('start', index)

  }

  over (event: DragEvent, index: number): void {
    console.log('over', index)

  }

  drop (event: DragEvent, index: number) {
    console.log('drop', index)

  }
}
