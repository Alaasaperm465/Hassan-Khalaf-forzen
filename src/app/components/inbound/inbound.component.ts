import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-inbound',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './inbound.component.html',
  styleUrls: ['./inbound.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InboundComponent implements OnInit, OnDestroy {
  inboundForm: FormGroup;
  loading = false;
  submitted = false;
  success = '';
  error = '';
  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private inventoryService: InventoryService,
    private router: Router
  ) {
    this.inboundForm = this.formBuilder.group({
      productName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      warehouseLocation: ['', Validators.required],
      expiryDate: [''],
      notes: ['']
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get f() {
    return this.inboundForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.error = '';
    this.success = '';

    if (this.inboundForm.invalid) {
      return;
    }

    this.loading = true;
    const formData = this.inboundForm.value;

    this.inventoryService.processInbound(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.success = 'Inbound stock received successfully!';
          this.inboundForm.reset();
          this.submitted = false;
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 2000);
        },
        error: (error) => {
          this.loading = false;
          this.error = error.error?.message || 'Failed to process inbound stock';
        }
      });
  }

  onReset() {
    this.inboundForm.reset();
    this.submitted = false;
    this.error = '';
    this.success = '';
  }
}
