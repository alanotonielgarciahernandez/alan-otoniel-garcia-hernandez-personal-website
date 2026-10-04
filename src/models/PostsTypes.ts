// PostsTypes.ts
// Posts type definitions for the project.

// Post entry type, representing a single post with its path, title, and date.
export interface PostEntry {
    id: string,
    path: string,
    title: string,
    format: 'markdown' | 'html',
    date: Date,
    timeAgo: string,
}

// Metadata entry loaded from locale index JSON files.
export interface PostIndexEntry {
    id: string,
    path: string,
    title: string,
    datetime: string,
    format?: 'markdown' | 'html',
}

// Props for the PostsScrollbar component, including the selected post index, a list of posts, and an optional callback for when a post is selected.
export interface PostScrollbarProps {
    selectedPost: number,
    postList: PostEntry[],
    onPostSelect?: ( postIndex: number ) => void,
}

export interface PostRendererProps {
    post: PostEntry,
}
