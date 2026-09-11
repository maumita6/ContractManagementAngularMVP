import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserProfile } from '../../../../core/mocks/user.mock';
import { ContractService } from '../../../contracts/contract.service';



@Component({
  selector: 'app-recent-contracts',
  templateUrl: './recent-contracts.component.html',
  styleUrls: ['./recent-contracts.component.css']
})
export class RecentContractsComponent implements OnInit, OnDestroy {

  public user: UserProfile | null = null;
  public contracts: any[] = [];
  public isUserLoading: boolean = true;
  private destroy$ = new Subject<void>();
  public recentContracts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public authService: AuthService, public contractService: ContractService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.contractService.contracts$
      .pipe(takeUntil(this.destroy$))
      .subscribe(allContracts => {
        this.recentContracts = this.contractService.getRecentContracts(5);
      });

    console.log('Recent contracts in dashboard:', this.recentContracts);
  }

  viewAllContracts(): void {
    // alert('Navigating to the full contract list...');
    this.router.navigate(['/dashboard/contracts']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
