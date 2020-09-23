export class WpPosts {
    id!: number;
    title!: WpPostContent;
    slug!: string;
    date!: Date;
    modified!: Date;
    link!: string;
    excerpt!: WpPostContent;
    author!: Number;
    content!: WpPostContent;
    status!: string;
}
export class WpPostsCreateModel {
    title!: string;
    slug!: string;
    content!: string;
    status!: string;
}

export class WpPostContent {
    rendered!: string;
}