import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({});

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  login(event: Event) {
    event.preventDefault();
    if (this.form.valid) {

      // Navegar al Dashboard
      this.router.navigateByUrl('/dashboard/list-persona');

    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['milton.sanchez7@gmail.com', [Validators.required]],
      password: ['milton90', [Validators.required]],
    });
  }

}
