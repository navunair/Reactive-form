import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'assignment';
  reactiveForm!: FormGroup;
  formBuilder: any;

  ngOnInit(){
    
    this.reactiveForm = new FormGroup({
      firstName: new FormControl(null,[Validators.required, Validators.maxLength(20)]),
      midName: new FormControl(null, [Validators.maxLength(20)]),
      lastName: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      age: new FormControl(null, [Validators.required, Validators.max(50), Validators.min(10), Validators.pattern("^[0-9]*$")]),
      address: new FormGroup({
        street: new FormControl('',[Validators.required, Validators.maxLength(20)]),
        landmark: new FormControl('',[Validators.maxLength(20)]),
        city: new FormControl('',[Validators.required, Validators.maxLength(20)]),
        state: new FormControl('',[Validators.required, Validators.maxLength(20)]),
        zip: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(20)]),
        country: new FormControl('India',[Validators.required, Validators.maxLength(20)])
      }),
      gender: new FormControl(null),
      hobbies: new FormArray([])
    })
    this.addHobby()
  }
  onSubmit(){
    if (this.reactiveForm.valid) {
      console.log(this.reactiveForm.value) 
   } else {
      console.log('cannot submit form')
   }
    
   console.log(this.reactiveForm.get('hobbies')?.valueChanges.subscribe(data => {console.log(data)}))
  }
  get hobbies() {
    return this.reactiveForm.get('hobbies') as FormArray;
  }
  addHobby() {
    this.hobbies.push(new FormControl(''));
  }
}
