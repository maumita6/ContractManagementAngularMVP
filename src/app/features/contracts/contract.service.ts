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
        },
        {
          id: 'CON-007',
          title: 'Logistics & Supply Chain Broker Master Agreement',
          status: 'Pending',
          createdAt: new Date().toISOString()
        },
        {
          id: 'CON-008',
          title: 'Premium Software Staff Augmentation Services',
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

  getContractById(id: string): Observable<Contract | undefined> {
    return this.contracts$.pipe(
      map(contracts => contracts.find(contract => contract.id === id))
    );
  }

  getRecentContracts(limit: number = 5): Contract[] {
    return this.contractsSubject$.value
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  // contract.service.ts
  updateContract(updated: Contract): void {
    const contracts = this.contractsSubject$.value.map(c =>
      c.id === updated.id ? { ...c, ...updated, updatedAt: new Date().toISOString() } : c
    );
    console.log('Contract ID:', updated.id);
    this.saveContracts(contracts);
  }


  deleteContracts(id: string): void {
    const contracts = this.contractsSubject$.value.filter(c => c.id !== id);

    // Ensure all IDs are primitive strings before saving
    const sanitized = contracts.map(c => ({
      ...c,
      id: String(c.id),
    }));
    console.log(sanitized);
    this.saveContracts(sanitized);
  }



}