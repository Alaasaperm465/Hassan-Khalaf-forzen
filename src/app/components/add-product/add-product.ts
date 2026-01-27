import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-product.html',
  styleUrls: ['./add-product.css']

})
export class AddProductComponent {

  submitted = false;
  loading = false;
  error = '';
  productForm;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.productForm.invalid) return;

    this.loading = true;
    const productData = { ...this.productForm.value, name: this.productForm.value.name || '' };
    this.productService.createProduct(productData).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: () => {
        this.error = 'Failed to create product';
        this.loading = false;
      }
    });
  }
}
