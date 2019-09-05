import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  model: any = {
    email: '',
    message: ''
  }
  
  constructor() { }

  ngOnInit() {}
  
  logInput() {
    console.warn(this.model);
  }
}
