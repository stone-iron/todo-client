const TodoInput = ({ input, onChange, onSubmit }) => {
  return (
    <form className="form" onSubmit={onSubmit}>
      <input
        type="text"
        className="input"
        placeholder="할 일 입력"
        value={input}
        onChange={onChange}
        maxLength={200}
        aria-label="할 일 입력"
      />
      <button type="submit" className="btn">추가</button>
    </form>
  )
}

export default TodoInput
