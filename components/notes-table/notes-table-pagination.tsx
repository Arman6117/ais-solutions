'use client'
import React from 'react'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination'


type NotesTablePaginationProps  = {
    currentPage:number
    setCurrentPage:(page:number)=>void,
    getPageNumbers:()=>(string | number)[]
    totalPages:number
}
const NotesTablePagination = ({currentPage,getPageNumbers,setCurrentPage,totalPages}:NotesTablePaginationProps) => {
  return (
    <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={
                  currentPage === 1
                    ? "pointer-events-none cursor-pointer opacity-50"
                    : ""
                }
              />
            </PaginationItem>

            {getPageNumbers().map((page, i) =>
              page === "ellipsis-start" || page === "ellipsis-end" ? (
                <PaginationItem key={`ellipsis-${i}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(Number(page))}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none cursor-pointer opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
  )
}

export default NotesTablePagination