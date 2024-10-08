export interface ProjectDatas {
    id: string;
    title: string;
    short: string;
    description: string;
    thumbnail_url: string; ///File | null;
    file_url: string;
    is_published: boolean;
    preview: string;
    frameworks: string[];
    programming_languages: string[];
}