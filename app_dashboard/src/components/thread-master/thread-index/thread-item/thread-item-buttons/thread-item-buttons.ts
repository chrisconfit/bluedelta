import { Component, Input } from '@angular/core';
import { ThreadsProvider } from "../../../../../providers/threads/threads";


@Component({
  selector: 'thread-item-buttons',
  templateUrl: 'thread-item-buttons.html'
})
export class ThreadItemButtonsComponent {
  @Input() thread;

  constructor(
    public threadService: ThreadsProvider
  ) {
  }

}
