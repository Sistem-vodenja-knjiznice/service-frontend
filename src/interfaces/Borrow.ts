export interface Borrow {
    id: number;
    user_id: number;
    book_id: number;
    borrow_date: string;
    due_date: string;
    status: string;
    extend_count: number;
}
