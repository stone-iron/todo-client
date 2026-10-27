# TodoList 프론트엔드

할 일 목록(TodoList) 화면을 구성하는 React 프로젝트입니다.
백엔드는 [todo-server](https://github.com/stone-iron/todo-server) (Spring Boot, `http://localhost:8080`)를 사용합니다.

## 기술 스택
- React 18, Vite 6
- axios (API 통신)
- sweetalert2 (알림, 확인 창)

## 실행 방법
1. 백엔드 서버(todo-server)를 먼저 실행합니다.
2. 패키지를 설치하고 개발 서버를 실행합니다.
   ```bash
   npm install
   npm run dev
   ```
3. 브라우저에서 `http://localhost:5173` 에 접속합니다.

백엔드 주소가 다르면 `.env.example`을 `.env`로 복사한 뒤 `VITE_API_URL`을 수정하세요.

## 기능
| 기능 | 사용 방법 | API |
|---|---|---|
| 목록 조회 | 첫 화면 10개, **더보기**로 10개씩 추가 | `GET /todos?page=1&size=10` |
| 할 일 추가 | 입력 후 **추가** 또는 Enter (빈 값은 경고) | `POST /todos` |
| 완료 / 미완료 | 동그라미 체크 클릭 | `PUT /todos` |
| 이름 수정 | 할 일을 **더블클릭** → Enter 저장, Esc 취소 | `PUT /todos` |
| 삭제 | **삭제** 버튼 | `DELETE /todos/{id}` |
| 전체 완료 | **전체완료** 버튼 | `PUT /todos` `{ id: null }` |
| 전체 삭제 | **전체삭제** → 확인 창에서 삭제 | `DELETE /todos` |

- 미완료 할 일이 위에, 완료한 할 일은 회색 취소선으로 아래에 표시됩니다.
- 서버에 연결할 수 없으면 안내 문구와 **다시 시도** 버튼을 보여 줍니다.

## 프로젝트 구조
```
src
├── main.jsx
├── App.jsx
├── App.css
├── index.css
├── apis
│   └── todoApi.js           axios 인스턴스와 API 함수
└── components
    ├── TodoContainer.jsx    상태 관리, API 호출
    ├── TodoHeader.jsx       제목, 전체 개수
    ├── TodoInput.jsx        할 일 입력
    ├── TodoList.jsx         목록, 더보기
    ├── TodoItem.jsx         할 일 한 줄 (체크, 수정, 삭제)
    └── TodoFooter.jsx       전체삭제, 완료 개수, 전체완료
```
