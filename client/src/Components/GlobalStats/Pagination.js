import React, { useEffect, useState } from 'react';
import "./Pagination.css";

const Pagination = ({postPerPage, totalPosts, paginate, minus, plus}) => {
    const pageNumbers = [];
    const [currentPage, setCurrentPage] = useState(1);
    
    for(let i = 1; i <= Math.ceil(totalPosts/postPerPage); i++) {
        pageNumbers.push(i);
    }

    var znak1="<<"
    var znak2=">>"

    return (
        <nav class="pagination">
            <ul class='breadcrumb'>
                <button  onClick={() => minus(minus)}>
                    {znak1}
                </button>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item' >
                        <button onClick={() => paginate(number)} >
                            {number}
                        </button>
                        
                    </li>
                ))}
                <button  onClick={() => plus(plus)}>
                    {znak2}
                </button>
            </ul>
        </nav>
    )
}

export default Pagination;