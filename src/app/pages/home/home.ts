import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ProductList } from '../../components/product-list/product-list';

@Component({
  selector: 'app-home',
  imports: [CommonModule, TranslateModule, ProductList],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
