import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { UserProfile } from '../mocks/user.mock';

export interface AuthResponse {
    token: string;
    //role: 'Reviewer' | 'Manager' | 'Admin';
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private readonly TOKEN_KEY = 'auth_token';
    private readonly ROLE_KEY = 'auth_role';
    private STORAGE_KEY = 'mvp_users';
    users: any[] = this.getStoredUsers();

    //Private BehaviorSubject stores the current state of the user profile, allowing components to subscribe and react to changes in authentication state.
    private currentUserSubject$: BehaviorSubject<UserProfile | null> = new BehaviorSubject<UserProfile | null>(null);

    public currentUser$: Observable<UserProfile | null> = this.currentUserSubject$.asObservable();

    constructor(private http: HttpClient) { }

    registerUser(user: any): Observable<any> {

        const existingUser = this.users.find((v: any) => v.email === user.email);

        if (existingUser) {
            return throwError(() => new Error('Email already exists'));
        }

        const newUser = {
            ...user, id: 'usr_' + Math.random().toString(36).substr(2, 9), createdAt: new Date().toISOString(),
            isActive: true
        };
        this.users.push(newUser);
        console.log('New user registered:', newUser);

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.users));
        return of({ success: true, user: newUser, message: 'User created successfully', }).pipe(delay(600));
    }

    /* public loadUserProfile(): Observable<UserProfile> {
         const token = this.getToken();
         if (token) {
             // Simulate fetching user profile from a backend service
             const userProfile: any = this.users;
             // console.log('Fetched user profile:', userProfile);
             this.currentUserSubject$.next(userProfile);
             console.log('User profile loaded:', userProfile);
             return of(userProfile).pipe(delay(500)); // Simulate network delay
         } else {
             this.currentUserSubject$.next(null);
             return throwError(() => new Error('No token found'));
         }
     }*/

    public loadUserProfile(): Observable<UserProfile | null> {
        const token = this.getToken();

        if (token) {
            const userProfile: any = this.users.find((user: any) => user.email === this.currentUserSubject$.value?.email);
            if (userProfile) {
                this.currentUserSubject$.next(userProfile);
                console.log('User profile loaded:', userProfile);
                return of(userProfile).pipe(delay(500));
            } else {
                this.currentUserSubject$.next(null);
                return throwError(() => new Error('User profile not found'));
            }
        } else {
            this.currentUserSubject$.next(null);
            return throwError(() => new Error('No token found'));
        }
    }
    //Mock Service : Login

    login(email: string, password: string): Observable<AuthResponse> {
        // Find user in localStorage
        const user = this.users.find(
            (v: any) => v.email === email && v.password === password
        );
        console.log('Login attempt for email:', email, 'with password:', password, 'User found:', user);
        if (user) {
            const JWTTOKEN: AuthResponse = {
                token: 'login-jwt-token' // dummy token for MVP
            };

            // Save token + role
            localStorage.setItem(this.TOKEN_KEY, JWTTOKEN.token);
            localStorage.setItem(this.ROLE_KEY, user.role || 'Reviewer');

            // Update current user subject
            this.currentUserSubject$.next(user);
            console.log(this.currentUserSubject$.getValue());
            console.log('User logged in successfully:', user);

            // Return observable with simulated delay
            return of(JWTTOKEN).pipe(
                delay(500),
                tap(() => {
                    console.log('User logged in successfully:', email);
                })
            );
        } else {
            // Throw error observable → UI can show error message
            return throwError(() => new Error('Invalid email or password'));
        }
    }


    // Role Assignment
    /*private getRoleForUser(email: string): 'Reviewer' | 'Manager' | 'Admin' {
        console.log('Determining role for email:', email);
        if (email.includes('manager'))
            return 'Manager';
        if (email.includes('admin'))
            return 'Admin';
        return 'Reviewer';
    }*/

    // Retrieve token
    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    // Retrieve role
    getRole(): string | null {
        return localStorage.getItem(this.ROLE_KEY);
    }
    //get users
    private getStoredUsers(): any[] {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];

    }

    // Check authentication
    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    // Logout
    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.ROLE_KEY);
        this.currentUserSubject$.next(null);
    }
}