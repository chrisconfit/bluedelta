import { Component, Input } from '@angular/core';
import { ThreadsProvider } from "../../../../providers/threads/threads";


@Component({
  selector: 'thread-item',
  templateUrl: 'thread-item.html'
})
export class ThreadItemComponent {
  @Input() thread;
  

  constructor(
    public threadService: ThreadsProvider
  ) {
  }

}
