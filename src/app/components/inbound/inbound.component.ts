import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { InboundService,ClientRequest } from '../../services/inbound.service';
import { ProductService, Product } from '../../services/product.service';
import { SectionService, Section } from '../../services/section.service';
// import { InboundService, Client } from '../../services/inbound.service';
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
  clients: ClientRequest[] = [];

  loading = false;
  submitting = false;
  successMessage = '';
  errorMessage = '';

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private inboundService: InboundService,
    private productService: ProductService,
    private sectionService: SectionService,
    // private clientService: ClientService
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
      clientId: [null, Validators.required],
      lines: this.fb.array([this.createLineFormGroup()])
    });
  }

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

  private loadData(): void {
    this.loading = true;

    forkJoin({
      products: this.productService.getAllProducts(),
      sections: this.sectionService.getAllSections(),
      clients: this.inboundService.getAllClients()
    })
    .pipe(
      finalize(() => (this.loading = false)),
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (res) => {
        this.products = res.products;
        this.sections = res.sections;
        this.clients = res.clients;
      },
      error: () => {
        this.errorMessage = 'Failed to load data';
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
    if (this.inboundForm.invalid) return;

    this.submitting = true;

    const payload = {
      clientId: this.inboundForm.value.clientId,
      lines: this.inboundForm.value.lines
    };

    this.inboundService.createInbound(payload)
      .pipe(finalize(() => (this.submitting = false)))
      .subscribe({
        next: (res) => {
          this.successMessage = `Inbound created (ID: ${res.id})`;
          this.inboundForm.reset();
          this.lines.clear();
          this.addLine();
        },
        error: () => {
          this.errorMessage = 'Failed to create inbound';
        }
      });
  }

  isFieldInvalid(field: string): boolean {
    const ctrl = this.inboundForm.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }
  resetForm(): void {
    this.inboundForm.reset();
    this.lines.clear();
    this.addLine();
  }
  closeAlert(type: 'success' | 'error'): void {
  if (type === 'success') {
    this.successMessage = '';
    } else {
      this.errorMessage = '';
    }
  }
  isLineFieldInvalid(index: number, field: string): boolean {
  const ctrl = this.lines.at(index)?.get(field);
  return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
}
getLineFieldError(index: number, field: string): string {
  const ctrl = this.lines.at(index)?.get(field);
  if (ctrl?.hasError('required')) return 'This field is required';
  if (ctrl?.hasError('min')) return 'Value must be 0 or more';
  return '';
}
createNewLine(): FormGroup {
  return this.createLineFormGroup();
}

}