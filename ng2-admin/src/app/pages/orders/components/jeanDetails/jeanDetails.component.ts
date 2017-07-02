import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jeanDetails',
  //template: `<strong>Order Details for Order {{id}}</strong>`,
  templateUrl: './jeanDetails.html',
  styleUrls: ['./jeanDetails.scss']
})
export class JeanDetailsComponent {
  id: number;
  private sub: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
