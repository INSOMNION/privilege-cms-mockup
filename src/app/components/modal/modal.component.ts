import {
  Component,
  Input, 
  Output, 
  OnInit, 
  EventEmitter, 
  OnChanges, 
  SimpleChanges, 
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnChanges {
  
  types: string[] = [
    "normal",
    "alert",
    "loading"
  ];

  @Input() type: string = "normal";
  @Input() class: string = "";
  @Input() title: string = "";
  @Input() subTitle: string = "";
  @Input() display: boolean = false;
  @Input() loading: boolean = false;
  @Input() closeBackdrop: boolean = false;

  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    let { type } = changes;
    if (type) {
      this.type = this.changeType(type.currentValue);
    }
  }

  changeType(type: string): string {
    type = type.toLowerCase();
    return !!this.types.find((e) => e === type) ? type : "normal";
  }

  ngOnInit(): void {
    this.type = this.changeType(this.type);
  }

  onClickBackdrop(event: Event) {
    if (event.target === event.currentTarget && this.closeBackdrop) {
      this.close.emit("close");
    }
  }
}
