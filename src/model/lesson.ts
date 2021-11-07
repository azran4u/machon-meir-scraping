export interface Lesson {
  id: string;
  url: string;
  title: string;
  date: Date;
  tags: string[];
  mediaUrl: string;
  updatedAt: Date;
  valid: boolean;
}
