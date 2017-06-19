import { Component, Input } from '@angular/core';
import { ThreadsProvider } from "../../../../../providers/threads/threads";

@Component({
  selector: 'thread-item-image',
  templateUrl: 'thread-item-image.html'
})
export class ThreadItemImageComponent {
  @Input() thread;

  constructor(
    public threadService: ThreadsProvider
  ) {
  }

}
