import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ContractService } from '../contract.service';
import { Router } from '@angular/router';
import { Contract } from '../../../core/models/contract.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit, OnDestroy {

  contracts: Contract[] = [];
  searchControl = new FormControl('');
  isLoading = false;
  currentRole: string = '';
  private destroy$ = new Subject<void>();
  filteredContracts: Contract[] = [];

  constructor(private contractService: ContractService,
    private router: Router,
    private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    //load current role from local storage
    this.currentRole = localStorage.getItem('auth_role') || 'REVIEWER';
    //this.filteredContracts = this.contracts;

    // Load all contracts 
    this.contractService.getContracts()
      .pipe(takeUntil(this.destroy$))
      .subscribe(contracts => {
        this.contracts = contracts;
        this.filteredContracts = [...contracts];
      });

    //emits an event every time the value of the control changes
    this.searchControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(term => {
        const lowerTerm = (term || '').toLowerCase();

        if (!lowerTerm) {
          this.filteredContracts = this.contracts;
          return;
        }


        this.filteredContracts = this.contracts.filter(
          c =>
            c.title.toLowerCase().includes(lowerTerm) ||
            c.id.toLowerCase().includes(lowerTerm) ||
            c.status.toLowerCase().includes(lowerTerm) ||
            c.createdAt.toLowerCase().includes(lowerTerm)
        );
        // this.contracts = [...this.contracts, ...this.filteredContracts];
        console.log('filteredContracts', this.filteredContracts);
      });

  }

  editContract(contract: Contract): void {
    if (!contract || !contract.id) {
      return;
    }
    //alert('navigating to edit ...');
    this.router.navigate(['/dashboard/contracts', contract.id], { queryParams: { action: 'edit' } });
  }

  viewContract(contract: Contract): void {
    if (!contract || !contract.id) {
      return;
    }
    this.router.navigate(['/dashboard/contracts', contract.id], { queryParams: { action: 'view' } });
  }

  deleteContract(contract: any): void {
    if (!contract || !contract.id) {
      return;
    }
    // Implement delete logic here
    //this.contractService.deleteContracts(contract);
    /* this.messageService.add({
       severity: 'alert',
       summary: 'Contract Deleted',
       detail: `Contract ${contract.id} deleted `
     });*/
    this.confirmationService.confirm({
      message: `Are you sure you want to delete contract ${contract.id}?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.contractService.deleteContracts(contract);
        this.messageService.add({
          severity: 'error',
          summary: 'Deleted',
          detail: `Contract ${contract.id} removed successfully`
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Cancelled',
          detail: 'Your delete action cancelled'
        });
      }
    });
  }
  approveContract(contract: Contract): void {
    if (!contract || !contract.id) {
      return;
    }
    // Implement approve logic here
    if (this.currentRole === 'APPROVER') {
      //alert('Access denied: Approvers cannot edit contracts.');
      this.messageService.add({
        severity: 'error',
        summary: 'Access Denied',
        detail: 'Approvers cannot edit contracts.'
      });
      return;
    }
    console.log('Approve contract with ID:', contract.id);
  }

  rejectContract(contract: Contract): void {
    if (!contract || !contract.id) {
      this.messageService.add({
        severity: 'error',
        summary: 'contract does not exist',
        detail: `Are you sure ${contract.id} exists ?`
      });
      return;
    }
    // Implement reject logic here
    if (this.currentRole === 'APPROVER') {
      this.confirmationService.confirm({
        message: `Are you sure you want to delete contract ${contract.id}?`,
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Contract Rejected',
            detail: `Contract ${contract.id} rejected`
          });
        },
        reject: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Rejection Cancelled',
            detail: 'You cancelled Contract ${contract.id} successfully'
          });
        }
      });
      //return;
    }
    console.log('Reject contract with ID:', contract.id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
