import { Pagination } from 'antd'
import React from 'react'

function RatedPagination({ totalPages, getRatedList }) {
  const change = (current) => {
    getRatedList(current)
  }
  return (
    <div className="footer">
      <Pagination className="pagination" total={totalPages} pageSize={1} onChange={change} showSizeChanger={false} />
    </div>
  )
}

export default RatedPagination
