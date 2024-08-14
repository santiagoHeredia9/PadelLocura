import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { useStore } from '@/app/lib/store/store';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

interface PaginationProps {
    totalItems: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems }) => {
    const { perPages, currentPage, changePage } = useStore();

    const totalPages = Math.ceil(totalItems / perPages);

    const handleChangePage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            changePage(page);
        }
    };

    return (
        <ButtonGroup className='lg:fixed lg:bottom-10 justify-center items-center flex gap-1 border-none rounded-2xl'>
           
            {Array.from({ length: totalPages }, (_, index) => (
                <Button
                    key={index + 1}
                    sx={{
                        border: 'none',
                        borderRadius: '100%',
                        minWidth: '40px',
                        height: '45px',
                        padding: '8px',
                        color: currentPage === index + 1 ? '#fff' : 'rgb(48, 68, 99)',
                        borderColor: 'rgb(48, 68, 99)',
                        backgroundColor: currentPage === index + 1 ? 'rgb(48, 68, 99)' : 'transparent',
                        ":hover": {
                            backgroundColor: currentPage === index + 1 ? 'rgb(48, 68, 99)' : 'rgba(0, 0, 0, 0.04)',
                            border: 'none',
                        },
                    }}
                    onClick={() => handleChangePage(index + 1)}
                    variant={currentPage === index + 1 ? 'contained' : 'outlined'}
                >
                    {index + 1}
                </Button>
            ))}
           
        </ButtonGroup>
    );
};

export default Pagination;
