# 미션 - 출석 체크 기록 API 구현

## 🚀 기능 요구 사항

출석 체크 기록 API를 구현한다.

1. 출석 요청
   - 출석 상태는 출석, 지각, 결석이 있다.
   - 출석: 수업 시작 시간 +- 10분이다.
   - 지각: 수업 시작 시간 10분 초과 20분 이하이다.
   - 결석: 수업 시작 시간 20분초과, 출석체크를 안 하면 결석이다.
   - 수업 시작 시간은 매 정시이다.
2. 출석 조회
   - 수강생 한 명의 출석 기록을 조회한다
   - 최대 30일 이내의 기록을 최신순으로 정렬한다.
   - Pagination(page:1, limit:10)을 적용한다.

### 공통 필수 예외처리 사항

- API에 요청받은 Body 값의 타입을 검증하여 올바르지 않은 타입일 경우 `400 BadRequest` 에러를 리턴해야한다.
- API에 요청받은 Body 값의 필수 값이 누락되거나/빈 값인 경우 `400 BadRequest` 에러를 리턴해야한다.

### API 요청/응답 요구 사항

1. 모든 API의 요청/응답은 DTO를 통해 TypeSafe하게 이루어져야한다.
2. DTO의 타입은 `class-validator`를 이용하여 검증한다.
3. DTO 내부 요소의 명칭은 `camelCase`로 작성한다.

#### 요청

- 이름, 학과, 학번은 `string` 타입이며, 각각 최대 `5`글자, `10`글자, `8`글자의 길이를 가진다.
  ```Typescript
  name : '어쩌다';
  department : '컴퓨터 공학과';
  studentId : '32201234';
  ```
- 출석 시간은 `Date` 타입이며, `YYYY-MM-DD HH:mm:ss` 형식의 문자열이다.
  ```Typescript
  attendanceTime : '2023-12-15 22:30:00';
  ```
- 출석 상태는 `string` 타입이며, `출석`, `지각`, `결석` 중 하나의 값이다.
  ```Typescript
  status : 'LATE';
  ```
- 출석 목록 조회시 `Pagination`을 지원한다.
  ```Typescript
  page : 1
  limit : 10
  ```

#### 응답

- 정상적으로 출석 체크 기록이 생성되었을 경우, `201 Created` 상태 코드와 함께 생성된 출석 체크 기록을 응답한다.
  ```Json
   {
      "id": 1,
      "attendanceTime": "2023-12-15 22:30:00",
      "status": "LATE",
      "userId" : 1,
       "user": {
          "id": 1,
          "name": "어쩌다",
          "department": "컴퓨터 공학과",
          "studentId": "32201234"
      }
   }
  ```
- 정상적으로 목록 조회시 출석 체크 기록을 응답한다.
  ```Json
   {
    "data" : [
      {
        "id": 1,
        "attendanceTime": "2023-12-15 22:30:00",
        "status": "LATE",
        "userId" : 1,
        "user": {
            "id": 1,
            "name": "어쩌다",
            "department": "컴퓨터 공학과",
            "studentId": "32201234"
        }
      }
    ],
    "page" : 1,
    "totalPage" : 1,
    "limit" : 10
   }
  ```
