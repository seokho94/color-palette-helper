# 4. Develop Plan - 개발 플랜

이 폴더에는 색상 추천 서비스의 Task 별 개발 계획이 포함되어 있습니다.

## 📁 문서 구조

| 문서 | 설명 | 작성일 |
|------|------|--------|
| **[Task-Manager.md](./Task-Manager.md)** | 📊 전체 Task 진행 상황 대시보드 | 2026-02-23 |
| [Task-00-Setup.md](./Task-00-Setup.md) | 프로젝트 초기 설정 | 2026-02-23 |
| [Task-01-Layout.md](./Task-01-Layout.md) | 기본 레이아웃 구현 | 2026-02-23 |
| [Task-02-Color-Input.md](./Task-02-Color-Input.md) | 색상 입력 기능 | 2026-02-23 |
| [Task-03-Palette-Generation.md](./Task-03-Palette-Generation.md) | 팔레트 생성 기능 | 2026-02-23 |
| [Task-04-Accessibility.md](./Task-04-Accessibility.md) | 접근성 검증 기능 | 2026-02-23 |
| [Task-05-Preview.md](./Task-05-Preview.md) | UI 미리보기 기능 | 2026-02-23 |
| [Task-06-Export.md](./Task-06-Export.md) | 코드 내보내기 기능 | 2026-02-23 |
| [Task-07-History.md](./Task-07-History.md) | 히스토리 & 즐겨찾기 | 2026-02-23 |
| [Task-08-Share.md](./Task-08-Share.md) | URL 공유 기능 | 2026-02-23 |
| [Task-09-Testing.md](./Task-09-Testing.md) | 테스트 & 배포 | 2026-02-23 |

## 🎯 개발 순서

```
Task 00: Setup ✅ (완료)
  ↓
Task 01: Layout (Week 1)
  ↓
Task 02: Color Input (Week 1)
  ↓
Task 03: Palette Generation (Week 2)
  ↓
Task 04: Accessibility (Week 2-3)
  ↓
Task 05: Preview (Week 2-3)
  ↓
Task 06: Export (Week 3)
  ↓
Task 07: History (Week 3)
  ↓
Task 08: Share (Week 3)
  ↓
Task 09: Testing & Deploy (Week 4)
```

## 📊 진행 상황 확인

### 실시간 대시보드
👉 **[Task-Manager.md](./Task-Manager.md)** 파일을 확인하세요!

### 주간 진행률
- **Week 1**: Task 00 ✅, Task 01 ⏳, Task 02 ⏳
- **Week 2**: Task 03, Task 04, Task 05
- **Week 3**: Task 04, Task 05, Task 06, Task 07, Task 08
- **Week 4**: Task 09

## 🏷️ Task 상태 표시

| 아이콘 | 상태 | 설명 |
|--------|------|------|
| ⬜ | Not Started | 시작 전 |
| ⏳ | In Progress | 진행 중 |
| ✅ | Done | 완료 |
| ⚠️ | Blocked | 블록됨 (선행 작업 대기) |
| 🔄 | Review | 리뷰 중 |

## 📝 Task 문서 구조

각 Task 문서는 다음 구조를 따릅니다:

```markdown
# Task {번호}: {제목}

## 1. 개요
- 목표
- 우선순위
- 예상 시간
- 담당자

## 2. 선행 작업
- 의존성 Task

## 3. 개발 항목 체크리스트
- [ ] 항목 1
- [ ] 항목 2

## 4. 파일 구조
- 생성/수정할 파일 목록

## 5. 구현 가이드
- 상세 구현 방법

## 6. 테스트 체크리스트
- [ ] 테스트 항목

## 7. 완료 조건
- 완료 기준

## 8. 참고 문서
- 관련 문서 링크
```

## 🔄 업데이트 방법

### Task 시작 시
1. Task-Manager.md에서 상태를 ⏳로 변경
2. 해당 Task 파일에서 체크리스트 업데이트

### Task 완료 시
1. Task-Manager.md에서 상태를 ✅로 변경
2. 완료 날짜 기록
3. 다음 Task 시작

## 📅 마일스톤

| 마일스톤 | 목표일 | 포함 Task | 상태 |
|---------|--------|----------|------|
| **M1: Foundation** | Week 1 종료 | Task 00, 01, 02 | ⏳ |
| **M2: Core Features** | Week 2 종료 | Task 03, 04, 05 | ⬜ |
| **M3: Advanced Features** | Week 3 종료 | Task 06, 07, 08 | ⬜ |
| **M4: Production Ready** | Week 4 종료 | Task 09 | ⬜ |

## 🎯 현재 Sprint

**Sprint 1 (Week 1)**
- 시작일: 2026-02-24
- 종료일: 2026-03-02
- 목표: 기본 레이아웃 + 색상 입력 완성

**현재 진행 중인 Task**:
- Task 01: Layout ⏳
- Task 02: Color Input ⏳

---

**문서 업데이트**: 2026-02-23
