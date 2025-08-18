# 🛍️ My Commerce App

Next.js · Zustand · React Query 기반의 커머스(이커머스) 데모 프로젝트

---

## 🚀 주요 기능

- **회원가입/로그인/로그아웃** (Firebase 인증 연동)
- **상품 목록/상세/검색/카테고리별 조회**
- **찜/장바구니/주문내역(마이페이지) 기능**
- **반응형 UI/UX, 모바일 Drawer/햄버거 메뉴**
- **Zustand로 전역 상태관리 (장바구니/찜/인증/주문)**
- **세션 만료시 자동 로그아웃**

---

## 💾 실행 방법 (로컬 개발 환경)

1. **프로젝트 클론**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```
2. **필수 패키지 설치**
   ```bash
   npm install
   ```
3. **환경 변수 설정**
   - `/env.local`에 Firebase 등 인증 정보 입력
4. **개발 서버 실행**
   ```bash
   npm run dev
   ```
5. **로컬 접속**  
   [http://localhost:3000](http://localhost:3000)

---

## 📂 주요 폴더 구조

```
src/
├─ app/
│ ├─ products/
│ ├─ cart/
│ ├─ wishlist/
│ ├─ protected/
│ └─ ...
├─ components/
│ ├─ Header/
│ ├─ ProductCard.tsx
│ └─ ...
├─ store/
│ ├─ cartStore.ts
│ ├─ productStore.ts
│ └─ ...
├─ data/
├─ hooks/
├─ styles/
└─ ...
```

## ✨ 주요 기술 스택

- **Next.js 15**
- **React 18**
- **TypeScript**
- **Zustand** (상태관리)
- **Styled-Components** (스타일링)
- **React Query** (API 캐싱/비동기)
- **Firebase Auth** (인증)

## 📌 기타 참고

- 샘플 API: [https://fakestoreapi.com/](https://fakestoreapi.com/)
- 실제 배포시 .env/local 환경변수 별도 필요
- PR/Issue 환영!

---

> **프로젝트 소개, 주요 기능, 실행법, 기술스택, 폴더 구조, 환경설정** 등을 예시 그대로 복붙 후  
> ⚡ 프로젝트에 맞게 부분 수정하세요!

---

### 추가 작업(주석 정리, 설명, 문서화, 코드 리팩토링)

필요시 계속 요청해도 됩니다!

---

궁금한 점/오류 언제든 추가로 말씀해 주세요!  
(README는 언제든 확장/수정 가능)
