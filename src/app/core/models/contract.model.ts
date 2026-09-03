export interface Contract {
    id: string;
    title: string;
    status: 'Pending' | 'Completed';
    createdAt: string;
    updatedAt?: string;
}