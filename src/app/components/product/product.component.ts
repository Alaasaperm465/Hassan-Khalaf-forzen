import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']  
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  error = '';
  
  showModal = false;
  productForm: FormGroup;
  submitting = false;
  formError = '';
  formSuccess = false;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: data => {
        this.products = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load products';
        this.loading = false;
      }
    });
  }

  openModal(): void {
    this.showModal = true;
    this.formError = '';
    this.formSuccess = false;
    this.productForm.reset();
  }

  closeModal(): void {
    this.showModal = false;
    this.formError = '';
    this.formSuccess = false;
    this.productForm.reset();
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    this.submitting = true;
    this.formError = '';
    this.formSuccess = false;

    this.productService.createProduct({ name: this.productForm.value.name }).subscribe({
      next: () => {
        this.formSuccess = true;
        this.submitting = false;
        setTimeout(() => {
          this.closeModal();
          this.loadProducts();
        }, 1500);
      },
      error: () => {
        this.formError = 'Failed to add product';
        this.submitting = false;
      }
    });
  }
}
