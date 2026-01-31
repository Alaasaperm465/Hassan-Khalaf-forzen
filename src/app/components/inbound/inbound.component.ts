import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { InboundService, InboundLine } from '../../services/inbound.service';
import { ProductService, Product } from '../../services/product.service';
import { SectionService, Section } from '../../services/section.service';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-inbound',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inbound.component.html',
  styleUrl: './inbound.component.css'
})
export class InboundComponent implements OnInit, OnDestroy {
  inboundForm!: FormGroup;
  products: Product[] = [];
  sections: Section[] = [];
  loading = false;
  submitting = false;
  successMessage = '';
  errorMessage = '';

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private inboundService: InboundService,
    private productService: ProductService,
    private sectionService: SectionService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm(): void {
    this.inboundForm = this.fb.group({
      clientName: ['', [Validators.required, Validators.minLength(2)]],
      lines: this.fb.array([this.createLineFormGroup()])
    }, { validators: this.minLinesValidator });
  }

  private minLinesValidator = (group: FormGroup): { [key: string]: any } | null => {
    const lines = group.get('lines') as FormArray;
    return lines && lines.length >= 1 ? null : { minLines: true };
  };

  private createLineFormGroup(): FormGroup {
    return this.fb.group({
      productName: ['', Validators.required],
      sectionName: ['', Validators.required],
      cartons: [0, [Validators.required, Validators.min(0)]],
      pallets: [0, [Validators.required, Validators.min(0)]]
    });
  }

  get lines(): FormArray {
    return this.inboundForm.get('lines') as FormArray;
  }

  createNewLine(): FormGroup {
    return this.createLineFormGroup();
  }

  private loadData(): void {
    this.loading = true;
    this.errorMessage = '';

    forkJoin({
      products: this.productService.getAllProducts(),
      sections: this.sectionService.getAllSections()
    }).pipe(
      finalize(() => {
        this.loading = false;
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (result) => {
        this.products = result.products || [];
        this.sections = result.sections || [];
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.errorMessage = 'Failed to load warehouse data. Please refresh the page.';
        this.products = [];
        this.sections = [];
      }
    });
  }

  addLine(): void {
    this.lines.push(this.createLineFormGroup());
  }

  removeLine(index: number): void {
    if (this.lines.length > 1) {
      this.lines.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.inboundForm.invalid) {
      this.errorMessage = 'Please fill all required fields correctly and add at least one line.';
      return;
    }

    this.submitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = {
      clientName: this.inboundForm.get('clientName')?.value,
      lines: this.lines.value
    };

    this.inboundService.createInbound(formData)
      .pipe(
        finalize(() => {
          this.submitting = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response) => {
          this.successMessage = `Inbound order created successfully! (ID: ${response.id})`;
          this.inboundForm.reset();
          this.lines.clear();
          this.lines.push(this.createLineFormGroup());

          // Clear success message after 5 seconds
          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
        },
        error: (err) => {
          console.error('Error creating inbound:', err);
          this.errorMessage = err.error?.message || 'Failed to create inbound order. Please try again.';
        }
      });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.inboundForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isLineFieldInvalid(index: number, fieldName: string): boolean {
    const field = this.lines.at(index)?.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getLineFieldError(index: number, fieldName: string): string {
    const field = this.lines.at(index)?.get(fieldName);
    if (field?.hasError('required')) return `${fieldName} is required`;
    if (field?.hasError('min')) return `${fieldName} must be at least 0`;
    return '';
  }

  closeAlert(type: 'success' | 'error'): void {
    if (type === 'success') {
      this.successMessage = '';
    } else {
      this.errorMessage = '';
    }
  }
}
