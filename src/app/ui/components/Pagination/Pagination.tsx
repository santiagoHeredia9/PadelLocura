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
        <ButtonGroup className='fixed bottom-10 justify-center items-center flex gap-1 border-none rounded-2xl'>
            <Button
                sx={{
                    ":hover": {
                        border: 'none',
                    },
                    minWidth: '40px',
                    padding: '8px',
                    borderRadius: '100%',
                    borderColor: 'transparent',
                    border: 'none',
                }}
                disabled={currentPage === 1}
                onClick={() => handleChangePage(currentPage - 1)}
            >
                <ArrowCircleLeftIcon sx={{ color: currentPage === 1 ? 'gray' : 'rgb(48, 68, 99)', height: '40px', width: '40px', ":hover": { color: 'rgb(10, 68, 99)' } }} />
            </Button>
            {Array.from({ length: totalPages }, (_, index) => (
                <Button
                    key={index + 1}
                    sx={{
                        border: 'none',
                        borderRadius: '100%',
                        minWidth: '40px',
                        height: '40px',
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
            <Button
                sx={{

                    ":hover": {
                        border: 'none',
                    },
                    minWidth: '40px',
                    padding: '8px',
                    borderRadius: '100%',
                    borderColor: "transparent",
                    border: 'none',


                }}
                disabled={currentPage === totalPages}
                onClick={() => handleChangePage(currentPage + 1)}
            >
                <ArrowCircleRightIcon sx={{ color: currentPage === totalPages ? 'gray' : 'rgb(48, 68, 99)', width: '40px', height: '40px', ":hover": { color: 'rgb(10, 68, 99)' } }} />
            </Button>
        </ButtonGroup>
    );
};

export default Pagination;
