import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContractService } from '../contract.service'; // Adjust path if necessary
import { Subject, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Contract } from '../../../core/models/contract.model';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.css']
})
export class ContractDetailsComponent implements OnInit, OnDestroy {
  action: any;
  contract: any; // Changed from contracts array to a single contract object
  private destroy$ = new Subject<void>();
  currentRole: string = '';
  userId: string | null = null;

  constructor(
    private contractService: ContractService,
    private route: ActivatedRoute, private messageService: MessageService
  ) { }

  ngOnInit(): void {
    //console.log('contract list initiated...');
    this.userId = this.route.snapshot.paramMap.get('id');
    this.action = this.route.snapshot.queryParamMap.get('action');

    this.currentRole = localStorage.getItem('auth_role') || 'REVIEWER';
    console.log(this.userId);

    if (this.userId) {
      this.contractService.getContractById(this.userId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(contract => {
          this.contract = contract;
          console.log(this.contract);
        });
    }
  }

  completeContract(contract: Contract) {
    if (!contract || !contract.id) {
      return;
    }
    contract.status = 'Completed';
    this.contractService.updateContract(contract);
    this.messageService.add({
      severity: 'success',
      summary: 'Contract Completed',
      detail: `Contract ${contract.id} signed off successfully`
    });
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
