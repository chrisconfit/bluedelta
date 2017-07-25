import { Component, ViewChild, TemplateRef, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import {OrdersProvider} from "../../../../../providers/orders/orders";

interface JeanDetails {
  jeanId: number;
  gender: string;
  style: string;
  fabric: string;
  accentThread: string;
  topThread: string;
  bottomThread: string;
  rivets: string;
  fakePocket: string;
  orderNotes: string;
}

@Component({
  selector: 'jeanDetailsEdit',
  templateUrl: './jeanDetailsEdit.html',
})
export class JeanDetailsEditComponent {
  @Input() data;
  editMode: boolean;
  jeanDetails: any;

  jeanBuild: JeanDetails[] = [
    {
      jeanId: 0,
      gender: '',
      style: '',
      fabric: '',
      accentThread: 'gold',
      topThread: 'gold',
      bottomThread: 'silver',
      rivets: 'yes',
      fakePocket: 'no',
      orderNotes: 'If possible, I would like these jeans to be monogrammed with my name.'
      + ' Let me know if there is an extra cost for this.',
    },
  ];

  constructor(public orderService: OrdersProvider) {
    this.editMode = false;
    this.jeanDetails = this.orderService.orderToViewDetails[0].orderItems[0].jean;
    console.log(this.jeanDetails);
    this.translateJeanDetails(this.jeanDetails);
    this.createJeanBuild();
  }

  translateJeanDetails(jeanDetails) {
    if(jeanDetails.gender === 1) {
      this.jeanDetails.gender = 'Male';
    } else {
      this.jeanDetails.gender = 'Female';
    }

    if(jeanDetails.fakePocket === true) {
      this.jeanDetails.fakePocket = 'Yes';
    } else {
      this.jeanDetails.fakePocket = 'No';
    }
  }

  createJeanBuild() {
    this.jeanBuild[0].jeanId = this.jeanDetails.jeanId;
    this.jeanBuild[0].gender = this.jeanDetails.gender;
    this.jeanBuild[0].style = this.jeanDetails.style;
    this.jeanBuild[0].fabric = this.jeanDetails.fabric;
    this.jeanBuild[0].accentThread = this.jeanDetails.accent_thread;
    this.jeanBuild[0].bottomThread = this.jeanDetails.bottom_thread;
    this.jeanBuild[0].topThread = this.jeanDetails.top_thread;
    this.jeanBuild[0].fakePocket = this.jeanDetails.fakePocket;
    this.jeanBuild[0].orderNotes = this.orderService.orderToViewDetails[0].orderItems[0].orderNotes;
  }

  @ViewChild('displayTmpl') displayTmpl: TemplateRef<any>;
  @ViewChild('editTmpl') editTmpl: TemplateRef<any>;

  selected: JeanDetails;

  getTemplate(jeanBuild) {
    // return this.selected && this.selected.id === jeanBuild.id ?
    //  this.editTmpl : this.displayTmpl;

    return this.editMode ? this.editTmpl : this.displayTmpl;
  }

  editJean(jeanBuild) {
    // TODO: Stage jeanBuild for editing (copy)
    this.editMode = true;
  }

  @ViewChild('jeanDetailsForm')jeanDetailsForm: any;

  saveJean(editJeanForm) {
    // TODO: get changes and send to db through API
    debugger;

    this.saveOrder();

    this.reset();
  }

  saveOrder() {
    debugger;
    var updatedOrder = JSON.parse(JSON.stringify(this.orderService.orderToViewDetails[0]));
    updatedOrder.orderItems[0].jean = this.jeanBuild[0];
    updatedOrder.orderItems[0].orderNotes = this.jeanBuild[0].orderNotes;

    this.orderService.editItemWithAuth(this.orderService.orderToViewDetails[0], {value: updatedOrder});
  }

  submitted = false; //form not submited : default
  //data: string; //this variable contains our data
  //Show data after form submit and set submitted to true
  onSubmit(data) {
    this.submitted = true;
    this.data = JSON.stringify(data, null, 2);
    console.log(this.data);
  }

  reset() {
    this.editMode = false;
  }

  updateGender(value) {
    if (value !== '') {
      this.jeanBuild[0].gender = value;
    }
  }

  updateStyle(value) {
    if (value !== '') {
      this.jeanBuild[0].style = value;
    }
  }

  updateFabric(value) {
    if (value !== '') {
      this.jeanBuild[0].fabric = value;
    }
  }

  updateAccentThread(value) {
    if (value !== '') {
      this.jeanBuild[0].accentThread = value;
    }
  }

  updateTopThread(value) {
    if (value !== '') {
      this.jeanBuild[0].topThread = value;
    }
  }

  updateBottomThread(value) {
    if (value !== '') {
      this.jeanBuild[0].bottomThread = value;
    }
  }

  updateRivets(value) {
    debugger;
    if (value !== '') {
      this.jeanBuild[0].rivets = value;
    }
  }

  updateFakePocket(value) {
    if (value !== '') {
      this.jeanBuild[0].fakePocket = value;
    }
  }

  updateOrderNotes(value) {
    if (value !== '') {
      this.jeanBuild[0].orderNotes = value;
    }
  }
}
