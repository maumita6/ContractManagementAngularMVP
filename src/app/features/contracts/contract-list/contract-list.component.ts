import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ContractService } from '../contract.service';
import { Router } from '@angular/router';
import { Contract } from '../../../core/models/contract.model';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit, OnDestroy {

  contracts: Contract[] = [];
  searchControl = new FormControl('');
  isLoading = false;

  private destroy$ = new Subject<void>();

  constructor(private contractService: ContractService, private router: Router) { }

  ngOnInit(): void {
    // Load all contracts 
    this.contractService.getContracts()
      .pipe(takeUntil(this.destroy$))
      .subscribe(contracts => {
        this.contracts = contracts;
      });
  }

  viewContract(id: string): void {
    this.router.navigate(['/contracts', id]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
