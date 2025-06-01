import AdminStructure from "./adminStructure";
import UserStructure from "./userStructure";

export interface BlogCategoryStructure {
    id: number;
    category: string;
    created_at: Date | String | null;
    updated_at: Date | String | null;
}

export interface BlogStructure {
    id: number;
    caption: string;
    photo: string;
    user_id: string | null;
    admin_id: string | null;
    category_id: number | null;
    likes_count: number;
    comments_count: number;
    status: "Draft" | "Published";
    created_at: Date | String | null;
    updated_at: Date | String | null;

    user: UserStructure;
    admin: AdminStructure;
    category: BlogCategoryStructure;
    comments: BlogCommentStructure[];
    likes: BlogLikeStructure[];
}

export interface BlogCommentStructure {
    id: number;
    comment: string;
    blog_id: string | null;
    admin_id: string | null;
    user_id: string | null;
    created_at: Date | String | null;
    updated_at: Date | String | null;

    blog: BlogStructure;
    user: UserStructure;
    admin: AdminStructure;
}

export interface BlogLikeStructure {
    id: number;
    blog_id: string | null;
    admin_id: string | null;
    user_id: string | null;
    created_at: Date | String | null;
    updated_at: Date | String | null;
}