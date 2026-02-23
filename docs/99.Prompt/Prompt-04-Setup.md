# Prompt 04: 프로젝트 초기화

**날짜**: 2026-02-23
**단계**: 개발 환경 세팅
**목적**: Next.js 프로젝트 초기화 및 필요한 패키지 설치

---

## 📝 원본 프롬프트

```
현재 경로를 루트로 프로젝트 초기화 및 개발 환경 세팅 진행해줘
```

---

## 🎯 의도

1. **프로젝트 초기화**
   - Next.js 14 프로젝트 생성
   - TypeScript, TailwindCSS 설정

2. **패키지 설치**
   - 색상 처리 라이브러리 (chroma.js, color-thief)
   - 상태 관리 (Zustand)
   - UI 라이브러리 (react-colorful, lucide-react)

3. **개발 도구 설정**
   - ESLint, Prettier
   - Git 저장소 초기화

---

## ⚠️ 발생한 이슈

### 파일 충돌 문제
```
The directory color-palette-helper contains files that could conflict.
Either try using a new directory name, or remove the files listed above.
```

**원인**: 기존 `docs/`, `CLAUDE.md` 파일이 존재

**해결**: 수동으로 모든 파일 생성
- `create-next-app` 대신 수동 설정
- package.json 직접 작성
- tsconfig.json, tailwind.config.ts 등 개별 생성

---

## ✅ 결과물

### 생성된 파일 구조

```
color-palette-helper/
├── package.json              ✅
├── tsconfig.json             ✅
├── tailwind.config.ts        ✅
├── next.config.js            ✅
├── .eslintrc.json            ✅
├── .prettierrc               ✅
├── .gitignore                ✅
├── README.md                 ✅
│
├── app/
│   ├── layout.tsx            ✅
│   ├── page.tsx              ✅
│   └── globals.css           ✅
│
├── components/
│   ├── ui/
│   ├── color/
│   ├── palette/
│   ├── preview/
│   ├── export/
│   └── layout/
│
├── lib/
│   ├── utils.ts              ✅
│   ├── color/
│   └── export/
│
├── hooks/
├── store/
├── types/
│   ├── color.ts              ✅
│   └── accessibility.ts      ✅
│
└── constants/
    └── config.ts             ✅
```

### 설치된 패키지

**Dependencies**:
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "next": "^14.2.35",
  "chroma-js": "^3.2.0",
  "colorthief": "^2.6.0",
  "react-colorful": "^5.6.1",
  "zustand": "^5.0.11",
  "lucide-react": "^0.468.0",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.6.1"
}
```

**DevDependencies**:
```json
{
  "typescript": "^5.9.3",
  "@types/node": "^22.19.11",
  "@types/react": "^18.3.28",
  "@types/chroma-js": "^2.4.5",
  "tailwindcss": "^3.4.19",
  "eslint": "^9.39.3",
  "prettier": "^3.8.1",
  "vitest": "^2.1.9"
}
```

---

## 💡 학습 포인트

### 잘된 점
- ✅ 간결한 지시 ("현재 경로를 루트로")
- ✅ 명확한 목표 (초기화 + 환경 세팅)

### 문제 해결 과정
1. **문제**: `create-next-app` 파일 충돌
2. **시도 1**: 빈 디렉토리에서 생성 후 이동 → 실패
3. **시도 2**: `--force` 옵션 시도 → 비권장
4. **최종 해결**: 수동으로 모든 파일 생성 → 성공

### 개선 가능한 점
- 기존 파일 존재 여부를 먼저 언급
- 패키지 매니저 명시 (npm/yarn/pnpm)
- 원하는 디렉토리 구조 미리 제시

---

## 📊 영향도

이 프롬프트가 전체 프로젝트에 미친 영향:

- **생성된 파일**: 15+ 개 설정 파일
- **설치된 패키지**: 18개
- **디렉토리 구조**: 7개 주요 폴더
- **개발 준비**: 즉시 개발 가능한 상태

---

## 🎨 프롬프트 개선 버전

더 구체적으로 작성한다면:

```
현재 경로(C:\dev\git\color-palette-helper)를 루트로
Next.js 14 프로젝트를 초기화해줘.

**요구사항**:
1. 패키지 매니저: pnpm
2. TypeScript, TailwindCSS 포함
3. ESLint, Prettier 설정
4. Git 저장소 초기화

**설치할 패키지**:
- chroma-js (색상 조작)
- colorthief (이미지 색상 추출)
- react-colorful (Color Picker)
- zustand (상태 관리)
- lucide-react (아이콘)

**디렉토리 구조**:
- app/ (Next.js App Router)
- components/ (React 컴포넌트)
- lib/ (유틸리티 함수)
- store/ (Zustand 스토어)
- types/ (TypeScript 타입)

**주의사항**:
현재 디렉토리에 docs/, CLAUDE.md가 이미 존재함.
충돌 시 수동으로 파일 생성해줘.
```

---

## 🔗 관련 문서

- [package.json](../../package.json)
- [tsconfig.json](../../tsconfig.json)
- [README.md](../../README.md)

---

**이전 단계**: Prompt 03 (기획 및 설계)
**다음 단계**: Prompt 05 (기능 정의 & 와이어프레임)
