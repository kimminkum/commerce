// src/data/categoryData.ts
export const categories = [
  {
    name: "여성의류",
    icon: "👗",
    url: "women",
    path: "/products/category/women", // 실 데이터 존재
    subItems: [
      { name: "셔츠", path: "/products/category/women/shirts", dummy: true },
      {
        name: "원피스",
        path: "/products/category/women/onepiece",
        dummy: true
      },
      { name: "자켓", path: "/products/category/women/jacket", dummy: true }
    ]
  },
  {
    name: "남성의류",
    icon: "👕",
    url: "men",
    path: "/products/category/men", // 실 데이터 존재
    subItems: [
      { name: "셔츠", path: "/products/category/men/shirts", dummy: true },
      { name: "자켓", path: "/products/category/men/jacket", dummy: true },
      { name: "패딩", path: "/products/category/men/padding", dummy: true }
    ]
  },
  {
    name: "쥬얼리",
    icon: "💎",
    url: "jewelery",
    path: "/products/category/jewelery", // 실 데이터 존재
    subItems: [
      { name: "반지", path: "/products/category/jewelery/ring", dummy: true },
      {
        name: "목걸이",
        path: "/products/category/jewelery/necklace",
        dummy: true
      }
    ]
  },
  {
    name: "전자제품",
    icon: "💻",
    url: "electronics",
    path: "/products/category/electronics", // 실 데이터 존재
    subItems: [
      {
        name: "노트북",
        path: "/products/category/electronics/laptop",
        dummy: true
      },
      {
        name: "스마트폰",
        path: "/products/category/electronics/smartphone",
        dummy: true
      }
    ]
  }
];
