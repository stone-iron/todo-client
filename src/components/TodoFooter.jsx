const TodoFooter = ({ doneCount, shownCount, disabled, onCompleteAll, onDeleteAll }) => {
  return (
    <div className="footer">
      <button className="btn danger" onClick={onDeleteAll} disabled={disabled}>
        전체삭제
      </button>
      <span className="count">완료 {doneCount} / {shownCount}</span>
      <button className="btn" onClick={onCompleteAll} disabled={disabled}>
        전체완료
      </button>
    </div>
  )
}

export default TodoFooter
