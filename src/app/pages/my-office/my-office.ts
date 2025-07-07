import { Component } from '@angular/core';
import { HeroSection } from '../../shared/components/hero-section/hero-section';

@Component({
  selector: 'app-my-office',
  imports: [HeroSection],
  templateUrl: './my-office.html',
  styleUrl: './my-office.scss',
})
export class MyOffice {}
