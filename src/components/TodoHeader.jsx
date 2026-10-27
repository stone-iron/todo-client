const TodoHeader = ({ total }) => {
  return (
    <div className="header">
      <h1>To do List</h1>
      <p className="subtitle">전체 {total}개</p>
    </div>
  )
}

export default TodoHeader
