# 블록형 이력서 관리기 (Vue + Netlify + Neon)

Vue 3 + Vite 프론트엔드, Netlify Functions API, Neon(PostgreSQL) DB를 기준으로 만든 프로젝트 스캐폴드입니다.

## 1. 기술 스택

- Vue 3
- Vue Router
- Netlify Functions
- Neon PostgreSQL
- 순수 CSS 기반 공통 스타일

## 2. 로컬 실행

```bash
npm install
npm run dev
```

Netlify Functions까지 함께 로컬에서 보려면:

```bash
npm install -g netlify-cli
netlify login
cp .env.example .env
netlify dev
```

## 3. 환경 변수

`.env` 파일에 아래 값을 넣어주세요.

```env
DATABASE_URL=your_neon_connection_string
VITE_APP_NAME=블록형 이력서 관리기
```

## 4. Neon DB 초기화

`sql/schema.sql` 파일을 실행하면 필요한 테이블이 생성됩니다.

권장 테이블 순서:
1. profiles
2. content_blocks
3. resumes
4. resume_items

## 5. 페이지 구조

- `/blocks` : 내용 블록 관리
- `/composer` : 이력서 조합 & 저장
- `/resumes` : 저장된 이력서 버전 목록
- `/resumes/:id` : 이력서 상세 페이지

## 6. Netlify 배포

1. Git 저장소를 Netlify에 연결
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Environment variables에 `DATABASE_URL` 추가
5. Deploy

## 7. 현재 상태

이 프로젝트는 **UI + 기본 API 스캐폴드**가 들어있는 버전입니다.

- 프론트는 mock 데이터로도 동작
- Functions는 Neon 연결 시 실제 데이터 사용
- CRUD 전체 완성본은 아니고, 시작하기 좋은 구조를 우선 제공

## 8. 추천 다음 작업

1. `sql/schema.sql`로 DB 생성
2. `netlify/functions/blocks.js`와 `resumes.js` CRUD 확장
3. 조합 화면 저장 연결
4. PDF 출력 기능 추가
5. 광고 슬롯(`AdSlot.vue`) 실제 애드센스 코드 교체

## 9. 광고 구조

현재는 상단/하단만 쓰는 계획을 반영해 `AdSlot.vue` 컴포넌트를 만들어 두었습니다.
실제 배포 시 애드센스 스크립트와 슬롯 코드를 해당 컴포넌트로 교체하면 됩니다.
