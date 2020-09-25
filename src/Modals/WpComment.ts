import { WpPostContent } from './WpPost';
export class WpPostCommentsModel {
    id!: number;
    author_name!: string;
    author_url!: string;
    date!: string;
    content!: WpPostContent;
}