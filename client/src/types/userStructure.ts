export default interface UserStructure {
    id: string;
    fname: string;
    mname: string | null;
    lname: string;
    username: string;
    email: string;
    password: string;
    pfp: string | null;
    created_at: Date | null;
    updated_at: Date | null;
}