import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jeanDetailsEdit',
  //template: `<strong>Order Details for Order {{id}}</strong>`,
  templateUrl: './jeanDetailsEdit.html',
  styleUrls: ['./jeanDetailsEdit.scss']
})
export class JeanDetailsEditComponent {
  id: number;
  private sub: any;

  constructor(private route: ActivatedRoute) {}
}
