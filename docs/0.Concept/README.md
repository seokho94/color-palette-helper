# 0. Concept - 색상 추천 서비스 기획

이 폴더에는 웹 서비스 UI 색상 추천 서비스의 기획 및 개념 문서가 포함되어 있습니다.

## 📁 문서 구조

| 문서 | 설명 |
|------|------|
| [01-Overview.md](./01-Overview.md) | 프로젝트 개요, 목적, 타겟 사용자 |
| [02-Core-Features.md](./02-Core-Features.md) | 핵심 기능 요구사항 상세 |
| [03-Tech-Stack.md](./03-Tech-Stack.md) | 추천 기술 스택 및 라이브러리 |
| [04-Data-Requirements.md](./04-Data-Requirements.md) | 필요한 데이터, 알고리즘, 공식 |
| [05-Development-Roadmap.md](./05-Development-Roadmap.md) | 단계별 개발 로드맵 (Phase 1~6) |
| [06-References.md](./06-References.md) | 참고 자료, 도구, 커뮤니티 |

## 🎯 빠른 시작

처음 프로젝트를 이해하려면 다음 순서로 읽으세요:

1. **01-Overview.md** - 프로젝트가 무엇인지 파악
2. **02-Core-Features.md** - 어떤 기능이 필요한지 확인
3. **05-Development-Roadmap.md** - 어떻게 만들 것인지 계획 확인
4. **03-Tech-Stack.md** - 어떤 기술을 쓸지 결정

## 💡 주요 내용 요약

### 프로젝트 목표
웹 서비스의 컨셉을 분석하고 UI 색상 조합을 자동으로 추천하는 지능형 도구

### 핵심 기능 (MVP)
- 색상 조화 규칙 기반 팔레트 생성
- 이미지/URL에서 색상 자동 추출
- 접근성(WCAG) 자동 검증
- 산업별/무드별 맞춤 추천

### 추천 기술 스택
- **Frontend**: Next.js + TypeScript + TailwindCSS
- **Color Libraries**: chroma.js, color-thief
- **Deploy**: Vercel

### 개발 기간
- **MVP**: 2~3주
- **전체 (Phase 1~6)**: 16~21주

## 🔄 업데이트 이력

- 2026-02-23: 초기 기획 문서 작성
