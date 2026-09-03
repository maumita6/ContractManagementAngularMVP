import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserProfile } from '../../../core/mocks/user.mock';
import { ContractService } from '../../contracts/contract.service';




@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
    mode: string | null = null;

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

    ngOnInit() {
        // one-time snapshot
        this.mode = this.route.snapshot.queryParamMap.get('userRole');
        console.log('User role from query params (snapshot):', this.mode);

        this.loadContracts()

        this.contractService.contracts$
            .pipe(takeUntil(this.destroy$))
            .subscribe(allContracts => {
                this.recentContracts = this.contractService.getRecentContracts(5);
            });

        console.log('Recent contracts in dashboard:', this.recentContracts);
        //get logged in user profile from auth service
        this.authService.currentUser$
            .pipe(takeUntil(this.destroy$))
            .subscribe((user: UserProfile | null) => {
                this.user = user;
                console.log('Current user profile dashboard:', this.user);
                if (user) {
                    console.log('User profile found in dashboard:', user);
                } else {
                    console.log('No user profile available --- user is not authenticated.');
                }
            });

        this.authService.loadUserProfile().subscribe({
            next: () => this.isUserLoading = false,
            error: () => this.isUserLoading = false
        });
    }

    private loadContracts() {
        this.contracts = [
            { id: 1, client: 'Client A', status: 'Active', value: 10000 },
            { id: 2, client: 'Client B', status: 'Pending', value: 5000 },
            { id: 3, client: 'Client C', status: 'Completed', value: 15000 },
            { id: 4, client: 'Client D', status: 'Cancelled', value: 2000 }
        ];
    }





    logout(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    ngOnDestroy(): void {
        // Clean up any subscriptions or resources here if needed
        this.destroy$.next();
        this.destroy$.complete();
    }

}
