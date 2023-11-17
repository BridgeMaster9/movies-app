import { Pagination } from 'antd'
import React from 'react'
import './page-pagination.css'

function PagePagination({ totalPages, movie, getData }) {
  const change = (current) => {
    getData(movie, current)
  }
  return (
    <div className="footer">
      <Pagination className="pagination" total={totalPages} pageSize={1} onChange={change} showSizeChanger={false} />
    </div>
  )
}

export default PagePagination
