# Prompt 01: 초기 개념 수립

**날짜**: 2026-02-23
**단계**: 프로젝트 아이디어 구상
**목적**: 색상 추천 서비스의 기술 스택과 필요한 기능/정보 파악

---

## 📝 원본 프롬프트

```
Web 서비스를 개발할 때, UI 디자인 부분에서 색상 추천 서비스를 개발하려고해.
개발 중인 Web 서비스의 컨셉을 분석하고 새로 개발할 페이지에 대한 UI 색상을
조합을 추천하는 서비스를 개발하려면 어떤 기술 스택과 기능 및 정보들이 필요할까?
```

---

## 🎯 의도

1. **기술 스택 제안 받기**
   - Frontend/Backend 프레임워크
   - 색상 처리 라이브러리
   - 상태 관리 도구

2. **핵심 기능 정의**
   - 색상 추천 알고리즘
   - UI 미리보기
   - 접근성 검증

3. **필요한 데이터/정보 파악**
   - 색상 이론 (Color Theory)
   - WCAG 가이드라인
   - 산업별 색상 트렌드

---

## ✅ 결과물

### 제안된 기술 스택
- **Frontend**: Next.js 14 + TypeScript + TailwindCSS
- **State**: Zustand
- **Color Libraries**: chroma.js, color-thief, react-colorful
- **Testing**: Vitest

### 도출된 핵심 기능 (19개)
1. Color Picker (HEX/RGB/HSL)
2. 이미지 색상 추출
3. 6가지 Harmony 규칙
4. WCAG 접근성 검증
5. UI 컴포넌트 미리보기
6. 7가지 포맷 내보내기
7. 히스토리 & 즐겨찾기
8. URL 공유
9. ... (총 19개)

### 필요한 데이터/정보
- 색상 조화 이론 (색상환 기반)
- WCAG 2.1 AA/AAA 기준
- 대비 비율 계산 공식
- 산업별 색상 팔레트 (Material, Tailwind 등)

---

## 💡 학습 포인트

### 잘된 점
- ✅ 명확한 목표 제시 ("색상 추천 서비스")
- ✅ 기술 스택과 기능/정보를 모두 질문
- ✅ 실용적인 사용 사례 ("Web 서비스 개발")

### 개선 가능한 점
- 타겟 사용자를 명시했으면 더 구체적인 답변 가능
- 예산/일정 제약 조건 언급
- MVP vs Full Feature 범위 구분

---

## 📊 영향도

이 프롬프트가 전체 프로젝트에 미친 영향:

- **문서 생성**: 0.Concept 폴더 (7개 파일)
- **기술 결정**: Next.js, Zustand, chroma.js 선택
- **MVP 범위**: 4주, 19개 핵심 기능
- **아키텍처**: 3-panel 레이아웃 구조

---

## 🔗 관련 문서

- [docs/0.Concept/01-Overview.md](../0.Concept/01-Overview.md)
- [docs/0.Concept/03-Tech-Stack.md](../0.Concept/03-Tech-Stack.md)
- [docs/0.Concept/02-Core-Features.md](../0.Concept/02-Core-Features.md)

---

**다음 단계**: Prompt 02 (개념 문서화)
