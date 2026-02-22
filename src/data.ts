export interface Product {
  id: string;
  name: string;
  brand: 'Nike' | 'Adidas' | 'Puma' | 'Jordan';
  price: number;
  image: string;
  category: 'Lifestyle' | 'Running' | 'Basketball';
  gender: 'Men' | 'Women' | 'Unisex';
  color: string;
  description: string;
  sizes: number[];
  isNew?: boolean;
  isLimited?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Air Jordan 1 Retro High OG',
    brand: 'Jordan',
    price: 180,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800',
    category: 'Basketball',
    gender: 'Men',
    color: 'Red/Black',
    description: 'The Air Jordan 1 Retro High OG combines premium leather and an iconic silhouette for a timeless look.',
    sizes: [7, 8, 9, 10, 11, 12],
    isNew: true,
    isLimited: true,
  },
  {
    id: '2',
    name: 'Nike Air Max 270',
    brand: 'Nike',
    price: 150,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    category: 'Lifestyle',
    gender: 'Men',
    color: 'Neon Green',
    description: 'Nike\'s first lifestyle Air Max brings you style, comfort and big attitude.',
    sizes: [8, 9, 10, 11],
    isNew: true,
  },
  {
    id: '3',
    name: 'Adidas Ultraboost 22',
    brand: 'Adidas',
    price: 190,
    image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&q=80&w=800',
    category: 'Running',
    gender: 'Women',
    color: 'White',
    description: 'The Ultraboost 22 provides ultimate energy return and a comfortable fit.',
    sizes: [6, 7, 8, 9],
  },
  {
    id: '4',
    name: 'Puma RS-X3',
    brand: 'Puma',
    price: 110,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800',
    category: 'Lifestyle',
    gender: 'Unisex',
    color: 'Multi',
    description: 'X marks extreme. Exaggerated. X3 takes it to a new level: cubed, enhanced, extra.',
    sizes: [7, 8, 9, 10, 11],
  },
  {
    id: '5',
    name: 'Jordan 4 Retro Military Black',
    brand: 'Jordan',
    price: 210,
    image: 'https://images.unsplash.com/photo-1597043530272-08721527463b?auto=format&fit=crop&q=80&w=800',
    category: 'Basketball',
    gender: 'Men',
    color: 'White/Black',
    description: 'A classic colorway for a legendary silhouette.',
    sizes: [8, 9, 10, 11, 12],
    isLimited: true,
  },
  {
    id: '6',
    name: 'Nike Dunk Low Panda',
    brand: 'Nike',
    price: 110,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800',
    category: 'Lifestyle',
    gender: 'Unisex',
    color: 'Black/White',
    description: 'The most versatile sneaker in the game.',
    sizes: [6, 7, 8, 9, 10, 11, 12],
    isNew: true,
  }
];
