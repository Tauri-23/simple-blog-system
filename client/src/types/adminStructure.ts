export default interface AdminStructure {
    id: string;
    username: string;
    email: string;
    password: string;
    created_at: Date | null;
    updated_at: Date | null;
}