# Prompt 06: 개발 플랜 작성

**날짜**: 2026-02-23
**단계**: Task 기반 개발 계획 수립
**목적**: 10개 Task로 구조화된 개발 플랜 및 진행 상황 추적 시스템 구축

---

## 📝 원본 프롬프트

```
@docs\ 문서 기반으로 @docs\ 에 4.DevelopPlan 폴더 생성해서
UI 및 기능에 대한 개발 플랜 작성해줘. 개발 플랜은 Task 별로
분리해서 작성해주고, 각 Task 별 진행 상황을 확인할 수 있는
Manager 또는 Check 파일 생성해줘
```

---

## 🎯 의도

1. **Task 기반 분할**
   - 전체 프로젝트를 독립적인 Task로 분리
   - 각 Task별 명확한 목표와 체크리스트

2. **진행 상황 추적**
   - Manager/Check 파일로 실시간 진행률 확인
   - Task 의존성 관리

3. **실행 가능한 계획**
   - 즉시 사용 가능한 코드 예제
   - 파일 구조, 테스트 항목, 완료 조건 명시

---

## ✅ 결과물

### 생성된 문서 (12개)

```
docs/
└── 4.DevelopPlan/
    ├── README.md                        (개요)
    ├── Task-Manager.md                  (📊 진행 상황 대시보드)
    ├── Task-00-Setup.md                 (✅ 완료)
    ├── Task-01-Layout.md                (⏳ In Progress)
    ├── Task-02-Color-Input.md           (⬜ Not Started)
    ├── Task-03-Palette-Generation.md    (⬜ Not Started)
    ├── Task-04-Accessibility.md         (⬜ Not Started)
    ├── Task-05-Preview.md               (⬜ Not Started)
    ├── Task-06-Export.md                (⬜ Not Started)
    ├── Task-07-History.md               (⬜ Not Started)
    ├── Task-08-Share.md                 (⬜ Not Started)
    └── Task-09-Testing.md               (⬜ Not Started)
```

### Task 구조

각 Task 문서는 다음 구조를 따름:

1. **목표** - Task의 목적
2. **선행 작업** - 의존성 Task
3. **개발 항목 체크리스트** - 세부 항목 (총 36개)
4. **파일 구조** - 생성/수정할 파일 목록
5. **구현 가이드** - 실제 코드 예제
6. **테스트 체크리스트** - 테스트 항목
7. **완료 조건** - 완료 기준
8. **스크린샷** - 작업 완료 후 첨부 예정
9. **참고 문서** - 관련 문서 링크

### Task 목록

| Task | 제목 | 예상 시간 | 체크리스트 | 상태 |
|------|------|-----------|------------|------|
| 00 | 프로젝트 초기 설정 | 4h | 10개 | ✅ Done |
| 01 | 기본 레이아웃 구현 | 6h | 8개 | ⏳ In Progress |
| 02 | 색상 입력 기능 | 12h | 12개 | ⬜ Not Started |
| 03 | 팔레트 생성 기능 | 16h | 10개 | ⬜ Not Started |
| 04 | 접근성 검증 기능 | 14h | 8개 | ⬜ Not Started |
| 05 | UI 미리보기 기능 | 12h | 9개 | ⬜ Not Started |
| 06 | 코드 내보내기 기능 | 10h | 9개 | ⬜ Not Started |
| 07 | 히스토리 & 즐겨찾기 | 8h | 6개 | ⬜ Not Started |
| 08 | URL 공유 기능 | 6h | 6개 | ⬜ Not Started |
| 09 | 테스트 & 배포 | 24h | 12개 | ⬜ Not Started |
| **Total** | **10 Tasks** | **112h** | **90개** | **10% 완료** |

### Task-Manager.md 특징

**실시간 대시보드**:
```
████████░░░░░░░░░░░░░░░░░░░░ 28% (10/36 완료)

Week 1: ████████████████░░░░ 80% (8/10 완료)
Week 2: ░░░░░░░░░░░░░░░░░░░░  0% (0/10 완료)
Week 3: ░░░░░░░░░░░░░░░░░░░░  0% (0/12 완료)
Week 4: ░░░░░░░░░░░░░░░░░░░░  0% (0/4 완료)
```

**Task 상태 요약**:
- ✅ Done: 10개 (28%)
- ⏳ In Progress: 2개 (6%)
- ⬜ Not Started: 24개 (66%)

**주간 계획** (Week 1-4)

**이슈 트래커**

**업데이트 로그**

---

## 💡 학습 포인트

### 잘된 점
- ✅ 기존 문서 참조 (@docs\ 문서 기반)
- ✅ 출력 폴더 명시 (4.DevelopPlan)
- ✅ 분할 단위 명시 (Task 별)
- ✅ 추적 시스템 요청 (Manager/Check 파일)

### 특히 효과적이었던 부분
- **즉시 실행 가능**: 모든 코드 예제가 Copy & Paste 가능
- **체계적 추적**: Task-Manager.md로 진행률 시각화
- **명확한 의존성**: 각 Task의 선행 작업 명시
- **완료 기준 명확화**: 체크리스트 + 테스트 + 완료 조건

### 개선 가능한 점
- Task 개수나 예상 시간 범위 제시
- 원하는 상세도 수준 명시
- 특정 Task 우선순위 지정

---

## 📊 영향도

이 프롬프트가 전체 프로젝트에 미친 영향:

- **문서 수**: 12개 Task 문서
- **라인 수**: 약 3,000+ 라인
- **코드 예제**: 100+ TypeScript/React 코드 블록
- **체크리스트**: 90개 항목
- **예상 총 시간**: 112시간 (4주)

---

## 🎨 프롬프트 개선 버전

더 구체적으로 작성한다면:

```
@docs\ 문서를 기반으로 @docs\4.DevelopPlan\ 폴더에
Task 기반 개발 플랜을 작성해줘.

**Task 구성** (10개):
1. Task 00: 프로젝트 초기 설정 (완료)
2. Task 01: 기본 레이아웃
3. Task 02: 색상 입력 기능
4. Task 03: 팔레트 생성
5. Task 04: 접근성 검증
6. Task 05: UI 미리보기
7. Task 06: 코드 내보내기
8. Task 07: 히스토리 & 즐겨찾기
9. Task 08: URL 공유
10. Task 09: 테스트 & 배포

**각 Task 문서에 포함할 내용**:
1. 목표 및 개요
2. 선행 작업 (의존성)
3. 개발 항목 체크리스트 (5-15개)
4. 파일 구조 (생성/수정할 파일 목록)
5. 구현 가이드 (TypeScript/React 코드 예제)
6. 테스트 체크리스트
7. 완료 조건
8. 참고 문서 링크

**Task-Manager.md**:
- 전체 진행률 대시보드 (시각적 프로그레스 바)
- 각 Task별 상태 (✅/⏳/⬜)
- 주간 계획 (Week 1-4)
- 이슈 트래커
- 업데이트 로그

**코드 예제 요구사항**:
- 즉시 Copy & Paste 가능한 수준
- TypeScript 타입 포함
- TailwindCSS 스타일 포함
- Zustand Store 연동 코드
- 주석 포함

기존 docs/2.Functional/, docs/3.Wireframe/ 참조해서
일관성 있게 작성해줘.
```

---

## 🔗 관련 문서

- [docs/4.DevelopPlan/README.md](../4.DevelopPlan/README.md)
- [docs/4.DevelopPlan/Task-Manager.md](../4.DevelopPlan/Task-Manager.md)
- [docs/4.DevelopPlan/Task-00-Setup.md](../4.DevelopPlan/Task-00-Setup.md)
- [docs/4.DevelopPlan/Task-01-Layout.md](../4.DevelopPlan/Task-01-Layout.md)

---

**이전 단계**: Prompt 05 (기능 정의 & 와이어프레임)
**다음 단계**: Prompt 07 (프롬프트 이력 관리)
