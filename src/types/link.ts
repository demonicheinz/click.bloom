export type Link = {
  id: string;
  title: string;
  url: string;
  description?: string;
  category?: string;
  icon?: string;
  is_active: boolean;
  position: number;
  click_count: number;
  created_at: string;
  updated_at: string;
}; 