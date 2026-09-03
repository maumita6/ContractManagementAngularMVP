import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { delay, tap, map } from 'rxjs/operators';
import { Contract } from '../../core/models/contract.model';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private STORAGE_KEY = 'mvp_contracts';
  private contractsSubject$ = new BehaviorSubject<Contract[]>(this.loadContracts());

  contracts$ = this.contractsSubject$.asObservable();

  // Load from localStorage
  private loadContracts(): Contract[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    } else {
      const seed: Contract[] = [
        {
          id: 'CON-001',
          title: 'Enterprise Cloud Infrastructure Service SLA',
          status: 'Pending',
          createdAt: new Date().toISOString()
        },
        {
          id: 'CON-002',
          title: 'Global Marketing & Brand Campaign Agreement',
          status: 'Completed',
          createdAt: new Date().toISOString()
        },
        {
          id: 'CON-003',
          title: 'Office Real Estate Lease & Facility Terms',
          status: 'Pending',
          createdAt: new Date().toISOString()
        },
        {
          id: 'CON-004',
          title: 'Cybersecurity Threat Auditing Consultation Contract',
          status: 'Completed',
          createdAt: new Date().toISOString()
        },
        {
          id: 'CON-005',
          title: 'External Logistics & Supply Chain Broker Master Agreement',
          status: 'Pending',
          createdAt: new Date().toISOString()
        },
        {
          id: 'CON-006',
          title: 'Executive Software Staff Augmentation Services',
          status: 'Completed',
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(seed));
      console.log('Seed contracts saved to localStorage:', seed);
      return seed;
    }
  }


  // Save to localStorage
  private saveContracts(contracts: Contract[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(contracts));
    this.contractsSubject$.next(contracts);
  }

  // Get all contracts
  getContracts(): Observable<Contract[]> {
    return this.contracts$;
  }

  getRecentContracts(limit: number = 5): Contract[] {
    return this.contractsSubject$.value
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }


}