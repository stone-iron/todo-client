import { useState } from 'react'

const TodoItem = ({ todo, onToggle, onRename, onRemove }) => {
  const { id, name, status } = todo
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(name)

  const startEdit = () => {
    setText(name)
    setEditing(true)
  }

  // 내용이 비었거나 그대로면 저장하지 않는다.
  const finishEdit = () => {
    setEditing(false)
    const newName = text.trim()
    if (newName && newName !== name) onRename(todo, newName)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') finishEdit()
    if (e.key === 'Escape') setEditing(false)
  }

  return (
    <li className={status ? 'todoItem active' : 'todoItem'}>
      <div className="item">
        <input
          type="checkbox"
          id={id}
          checked={status}
          onChange={() => onToggle(todo)}
        />
        <label htmlFor={id} aria-label={status ? '미완료로 변경' : '완료로 변경'}></label>
        {editing ? (
          <input
            className="edit"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={finishEdit}
            onKeyDown={onKeyDown}
            maxLength={200}
            autoFocus
          />
        ) : (
          <span className="name" onDoubleClick={startEdit} title="더블클릭해서 수정">
            {name}
          </span>
        )}
      </div>
      <div className="item">
        <button className="btn small" onClick={() => onRemove(id)}>삭제</button>
      </div>
    </li>
  )
}

export default TodoItem
