export interface Contract {
    id: number;
    client: string;
    status: 'Active' | 'Pending' | 'Completed' | 'Cancelled';
    value: number;
}