
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
export const PaginateCompenent = ( {pageCount, getPage}) => {
        const handlePageClick = (data) => {
            getPage(data.selected + 1)
   
        } 
        

    return (
        <ReactPaginate
        breakLabel="..."
        nextLabel=" > "
        onPageChange={handlePageClick}
        marginPagesDisplayed={1}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        previousLabel=" < "
        renderOnZeroPageCount={null}
        containerClassName={" flex p-3 justify-start gap-5 items-center mt-4"}
        pageClassName={"flex justify-center items-center py-2 px-4 border rounded-lg border-slate-700  "}
        pageLinkClassName={"text-black"}
        previousClassName={"border rounded-lg border-slate-700 px-4 py-2"}
        previousLinkClassName={"text-black"}
        nextClassName={" border rounded-lg border-slate-700 px-4 py-2"}
        nextLinkClassName={"text-black "}
        breakClassName={"page-item"}
        breakLinkClassName={"text-black"}
        activeClassName={"flex justify-center items-center py-2 px-4  bg-blackColor "}
        activeLinkClassName={"text-white"}
        disabledClassName={"previousClassName"}
      />

    )
}