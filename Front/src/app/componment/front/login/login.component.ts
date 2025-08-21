import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  id: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.renderer.setStyle(
      document.body,
      'background',
      "url('assets/images/FigeacFro.webp') no-repeat center center fixed"
    );
    this.renderer.setStyle(document.body, 'backgroundSize', 'cover');
  }

  ngOnDestroy(): void {
    // Clean up background on route change
    this.renderer.removeStyle(document.body, 'background');
    this.renderer.removeStyle(document.body, 'backgroundSize');
  }

  onSubmit() {
    // Handle login logic here
  }
}
