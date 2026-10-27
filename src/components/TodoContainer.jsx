import { useCallback, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import TodoHeader from './TodoHeader'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import TodoFooter from './TodoFooter'
import * as todoApi from '../apis/todoApi'

const PAGE_SIZE = 10

const toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 1500,
})

const TodoContainer = () => {
  const [todoList, setTodoList] = useState([])
  const [total, setTotal] = useState(0)
  const [loadedSize, setLoadedSize] = useState(PAGE_SIZE)  // 지금까지 불러온 개수
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 목록 조회: 1페이지부터 불러온 개수만큼 한 번에 다시 받아 온다.
  // (추가·수정·삭제 후에도 더보기로 펼친 목록이 그대로 유지된다)
  const getList = useCallback(async (size = loadedSize) => {
    try {
      const response = await todoApi.getTodos(1, size)
      setTodoList(response.data.list)
      setTotal(response.data.pagination.total)
      setError(null)
    } catch (e) {
      console.error(e)
      setError('서버에 연결할 수 없습니다. 백엔드 서버(localhost:8080)가 실행 중인지 확인하세요.')
    } finally {
      setLoading(false)
    }
  }, [loadedSize])

  useEffect(() => {
    getList()
  }, [getList])

  // 요청 실행 후 목록 새로고침, 실패하면 알림
  const request = async (apiCall, successMessage) => {
    try {
      await apiCall()
      if (successMessage) toast.fire({ icon: 'success', title: successMessage })
    } catch (e) {
      console.error(e)
      toast.fire({ icon: 'error', title: '요청에 실패했습니다.' })
    }
    await getList()
  }

  const onChange = (e) => setInput(e.target.value)

  // 할 일 추가
  const onSubmit = async (e) => {
    e.preventDefault()
    const name = input.trim()
    if (!name) {
      toast.fire({ icon: 'warning', title: '할 일을 입력해 주세요.' })
      return
    }
    await request(() => todoApi.createTodo(name), '추가했습니다.')
    setInput('')
  }

  // 완료 / 미완료 전환
  const onToggle = (todo) =>
    request(() => todoApi.updateTodo({ id: todo.id, status: !todo.status }))

  // 할 일 이름 수정
  const onRename = (todo, name) =>
    request(() => todoApi.updateTodo({ id: todo.id, name }), '수정했습니다.')

  // 할 일 삭제
  const onRemove = (id) =>
    request(() => todoApi.deleteTodo(id), '삭제했습니다.')

  // 전체 완료
  const onCompleteAll = () => {
    if (todoList.length === 0) return
    request(() => todoApi.completeAllTodos(), '모두 완료했습니다.')
  }

  // 전체 삭제 (확인 후)
  const onDeleteAll = async () => {
    if (todoList.length === 0) return
    const result = await Swal.fire({
      title: '전체 삭제',
      text: `할 일 ${total}개를 모두 삭제할까요?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
      confirmButtonColor: '#e5484d',
    })
    if (!result.isConfirmed) return
    setLoadedSize(PAGE_SIZE)
    request(() => todoApi.deleteAllTodos(), '모두 삭제했습니다.')
  }

  // 더보기: 다음 페이지만큼 더 불러온다.
  const onLoadMore = () => setLoadedSize((size) => size + PAGE_SIZE)

  const doneCount = todoList.filter((todo) => todo.status).length

  return (
    <div className="container">
      <TodoHeader total={total} />
      <TodoInput input={input} onChange={onChange} onSubmit={onSubmit} />
      {error ? (
        <div className="message error">
          <p>{error}</p>
          <button className="btn" onClick={() => getList()}>다시 시도</button>
        </div>
      ) : loading ? (
        <div className="message">불러오는 중...</div>
      ) : (
        <TodoList
          todoList={todoList}
          hasMore={todoList.length < total}
          onToggle={onToggle}
          onRename={onRename}
          onRemove={onRemove}
          onLoadMore={onLoadMore}
        />
      )}
      <TodoFooter
        doneCount={doneCount}
        shownCount={todoList.length}
        disabled={todoList.length === 0}
        onCompleteAll={onCompleteAll}
        onDeleteAll={onDeleteAll}
      />
    </div>
  )
}

export default TodoContainer
