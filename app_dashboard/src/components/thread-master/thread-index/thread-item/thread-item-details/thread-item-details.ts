import { Component, Input } from '@angular/core';
import { ThreadsProvider } from "../../../../../providers/threads/threads";

@Component({
  selector: 'thread-item-details',
  templateUrl: 'thread-item-details.html'
})
export class ThreadItemDetailsComponent {
  @Input() thread;

  constructor(
    public threadService: ThreadsProvider
  ) {
  }

}
