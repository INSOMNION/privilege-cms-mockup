import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarComponent  } from './pages/calendar/calendar.component';
import { ModalComponent } from './components/modal/modal.component';
import { PageNavigatorComponent } from './components/page-navigator/page-navigator.component';
import { DragAndDropComponent } from './components/drag-and-drop/drag-and-drop.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    DragAndDropComponent,
    PageNavigatorComponent,
    CalendarComponent,
    ModalComponent
  ],
  exports: [
    DragAndDropComponent,
    PageNavigatorComponent,
    CalendarComponent,
    ModalComponent,
    CommonModule,
    FormsModule,
  ]
})
export class SharedModule {}