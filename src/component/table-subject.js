import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('1', 159, 6.0, 24, 4.0),
    createData('2', 237, 9.0, 37, 4.3),
    createData('3', 262, 16.0, 24, 6.0),
    createData('4', 305, 3.7, 67, 4.3),
    createData('5', 356, 16.0, 49, 3.9),
    createData('6', 159, 6.0, 24, 4.0),
    createData('7', 237, 9.0, 37, 4.3),
    createData('8', 262, 16.0, 24, 6.0),
    createData('9', 305, 3.7, 67, 4.3),
    createData('10', 356, 16.0, 49, 3.9),
];

export default function TableSubject() {
    return (
        
            <TableContainer component={Paper} 
            sx={{
                mt: 5,
            }} >
                <Table
                    sx={{
                        bgcolor: '#FADDFF',
                        minWidth: 600,
                    }}
                    size="small"
                    aria-label="adense table"
                >
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#AA00FF' }} >
                            <TableCell align="center">ตอน</TableCell>
                            <TableCell align="center">จำนวนการรับ</TableCell>
                            <TableCell align="center">วัน-เวลา</TableCell>
                            <TableCell align="center">ห้องเรียน</TableCell>
                            <TableCell align="center">ผู้สอน</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 }
                                }}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                >
                                    {row.name}
                                </TableCell>

                                <TableCell align="center">{row.calories}</TableCell>
                                <TableCell align="center">{row.fat}</TableCell>
                                <TableCell align="center">{row.carbs}</TableCell>
                                <TableCell align="center">{row.protein}</TableCell>
                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
       
    );
}
