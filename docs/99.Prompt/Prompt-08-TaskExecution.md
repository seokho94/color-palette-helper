# Prompt 08: Task 순차 실행

**날짜**: 2026-02-23
**단계**: 개발 실행
**목적**: Task-Manager 기반 순차적 개발 진행 및 진행 상황 자동 업데이트

---

## 📝 원본 프롬프트

```
@docs\4.DevelopPlan\Task-Manager.md 참고해서 순차적으로 Task 진행해줘.

Task는 필요한 인원만큼 Agent Team 구성해서 진행해주고,

각 Task 종료 시 진행 상황을 업데이트 해줘.
```

---

## 🎯 의도

1. **체계적 실행**
   - Task-Manager.md 기반 순차 진행
   - Task 01 → Task 02 → ... 순서대로

2. **팀 협업 시뮬레이션**
   - 각 Task마다 필요한 Agent Team 구성
   - 역할별 전문성 반영

3. **자동 진행 관리**
   - Task 종료 시 Task-Manager.md 업데이트
   - 체크리스트 자동 체크
   - 진행률 시각화

---

## ✅ 실행 계획

### Task 순서
1. **Task 01**: 기본 레이아웃 구현 (⏳ In Progress → ✅ Done)
2. **Task 02**: 색상 입력 기능 (⏳ In Progress → ✅ Done)
3. **Task 03**: 팔레트 생성 기능
4. ... (순차 진행)

### Agent Team 구성 원칙
- **Task 01**: Frontend (정하은), Designer (최예린)
- **Task 02**: Frontend (정하은)
- **Task 03**: Frontend (정하은)
- 각 Task 특성에 맞게 동적 구성

---

## 💡 학습 포인트

### 잘된 점
- ✅ 명확한 기준 제시 (Task-Manager.md 참고)
- ✅ 자동화 요청 (진행 상황 업데이트)
- ✅ 팀 구성 유연성 (필요한 인원만큼)

---

**이전 단계**: Prompt 07 (프롬프트 이력 관리)
**다음 단계**: Task 01 실행 시작
