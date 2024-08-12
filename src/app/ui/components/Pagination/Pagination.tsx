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
        <ButtonGroup className='fixed bottom-10'>
            <Button
                sx={{
                    ":hover": {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        borderColor: 'rgb(159, 112, 253)',
                    },
                    minWidth: '40px',
                    padding: '8px',
                    borderRadius: '100%',
                    borderColor: 'rgb(159, 112, 253)',
                    
                }}
                disabled={currentPage === 1}
                onClick={() => handleChangePage(currentPage - 1)}
            >
                <ArrowCircleLeftIcon sx={{ color: currentPage === 1 ? 'gray' : 'rgb(159, 112, 253)' }} />
            </Button>
            {Array.from({ length: totalPages }, (_, index) => (
                <Button
                    key={index + 1}
                    sx={{
                        borderRadius: '100%',
                        minWidth: '40px',
                        padding: '8px',
                        color: currentPage === index + 1 ? '#fff' : 'rgb(159, 112, 253)',
                        borderColor: 'rgb(159, 112, 253)',
                        backgroundColor: currentPage === index + 1 ? 'rgb(159, 112, 253)' : 'transparent',
                        ":hover": {
                            backgroundColor: currentPage === index + 1 ? 'rgb(159, 112, 253)' :  'rgba(0, 0, 0, 0.04)',
                            borderColor: 'rgb(159, 112, 253)'
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
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        borderColor: 'rgb(159, 112, 253)'
                    },
                    minWidth: '40px',
                    padding: '8px',
                    borderRadius: '100%',
                    borderColor: 'rgb(159, 112, 253)',
                }}
                disabled={currentPage === totalPages}
                onClick={() => handleChangePage(currentPage + 1)}
            >
                <ArrowCircleRightIcon sx={{ color: currentPage === totalPages ? 'gray' : 'rgb(159, 112, 253)' }} />
            </Button>
        </ButtonGroup>
    );
};

export default Pagination;
