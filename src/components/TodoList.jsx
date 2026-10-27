import TodoItem from './TodoItem'

const TodoList = ({ todoList, hasMore, onToggle, onRename, onRemove, onLoadMore }) => {
  if (todoList.length === 0) {
    return <div className="message">할 일이 없습니다. 새로운 할 일을 추가해 보세요.</div>
  }

  return (
    <div className="todoList">
      <ul>
        {todoList.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onRename={onRename}
            onRemove={onRemove}
          />
        ))}
      </ul>
      {hasMore && (
        <button className="btn more" onClick={onLoadMore}>더보기</button>
      )}
    </div>
  )
}

export default TodoList
