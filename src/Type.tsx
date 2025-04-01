export interface ProductType {
    key: React.Key;
    name: string;
    chinese: number;
    math: number;
    english: number;
  }

export interface CategoryType {
  id: string;
  name: string;
  description: string | null; 
  image: string | null
}