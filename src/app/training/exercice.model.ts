export interface Exercice {
    id: string;
    name: string;
    duration: number;
    calories: number;
    reps?: number;
    number?: number;
    date?: Date;
    state?: 'completed' | 'cancelled' | null;
}
