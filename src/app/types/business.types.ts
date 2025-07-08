// Business logic and domain-specific types (non-data models)
export type ProductName = 'My Office' | 'My Club' | 'My Landlord' | 'My Tax';

// Status and state types
export type AuthStatus = 'authenticated' | 'unauthenticated' | 'pending';
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
