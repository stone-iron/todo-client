import axios from 'axios'

// 백엔드 서버 주소: .env 의 VITE_API_URL, 없으면 localhost:8080
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
})

// [GET] 목록 (페이징) → { list, pagination }
export const getTodos = (page = 1, size = 10) =>
  api.get('/todos', { params: { page, size } })

// [POST] 등록
export const createTodo = (name) =>
  api.post('/todos', { name })

// [PUT] 수정 (상태 변경, 이름 변경)
export const updateTodo = (todo) =>
  api.put('/todos', todo)

// [DELETE] 삭제
export const deleteTodo = (id) =>
  api.delete(`/todos/${id}`)

// [PUT] 전체 완료 - id 를 null 로 보낸다
export const completeAllTodos = () =>
  api.put('/todos', { id: null })

// [DELETE] 전체 삭제
export const deleteAllTodos = () =>
  api.delete('/todos')
