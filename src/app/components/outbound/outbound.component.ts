import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-outbound',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './outbound.component.html',
  styleUrls: ['./outbound.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OutboundComponent implements OnInit, OnDestroy {
  outboundForm: FormGroup;
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
    this.outboundForm = this.formBuilder.group({
      productName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      destination: ['', Validators.required],
      orderId: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get f() {
    return this.outboundForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.error = '';
    this.success = '';

    if (this.outboundForm.invalid) {
      return;
    }

    this.loading = true;
    const formData = this.outboundForm.value;

    this.inventoryService.processOutbound(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.success = 'Outbound stock shipped successfully!';
          this.outboundForm.reset();
          this.submitted = false;
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 2000);
        },
        error: (error) => {
          this.loading = false;
          this.error = error.error?.message || 'Failed to process outbound stock';
        }
      });
  }

  onReset() {
    this.outboundForm.reset();
    this.submitted = false;
    this.error = '';
    this.success = '';
  }
}
