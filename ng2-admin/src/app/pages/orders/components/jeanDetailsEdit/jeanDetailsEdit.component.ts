import { Component, ViewChild, TemplateRef } from '@angular/core';

interface JeanDetails {
  id: number;
  gender: string;
  style: string
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
  editMode: boolean;
  constructor() {
    this.editMode = false;
  }

  @ViewChild('displayTmpl') displayTmpl: TemplateRef<any>;
  @ViewChild('editTmpl') editTmpl: TemplateRef<any>;

  jeanBuild: JeanDetails[] = [
    {
      id: 1,
      gender: 'Male',
      style: 'Straight',
      fabric: '8oz. Raw Denim Classic Indigo',
      accentThread: 'gold',
      topThread: 'gold',
      bottomThread: 'silver',
      rivets: 'yes',
      fakePocket: 'no',
      orderNotes: 'If possible, I would like these jeans to be monogrammed with my name. Let me know if there is an extra cost for this.',
    }
  ];

  selected: JeanDetails;

  getTemplate(jeanBuild) {
    // return this.selected && this.selected.id === jeanBuild.id ?
    //  this.editTmpl : this.displayTmpl;

    return this.editMode ? this.editTmpl : this.displayTmpl;
  }

  editJean(jeanBuild) {
    console.log('test');
    this.editMode = true;
  }

  saveJean(jeanBuild) {
    console.log('Saving changes');
    // TODO: get changes and send to db through API
    this.reset();
  }

  reset() {
    console.log('reset');
    this.editMode = false;
  }
}
