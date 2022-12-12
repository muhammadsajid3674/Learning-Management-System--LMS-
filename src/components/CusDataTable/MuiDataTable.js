import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { IconButton, styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#333',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#F5F6FA',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

export default function MuiDataTable(props) {

    const { dataSource, colValue, onClickRow } = props

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        <StyledTableCell>#</StyledTableCell>
                        {colValue && colValue.length > 0 ? colValue.map((e, i) => {
                            return <StyledTableCell scope="col" key={i}>{e.name}</StyledTableCell>
                        }) : null}
                        <StyledTableCell>Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {dataSource && Array.isArray(dataSource) && dataSource.length > 0 ? (
                                dataSource.map((e, i) => {
                                    return <StyledTableRow scope='row' key={i}>
                                        <TableCell>{i + 1}</TableCell>
                                        {colValue && colValue.length > 0 ? colValue.map((x, i) => {
                                            return <TableCell key={i}>{e[x.key]}</TableCell>
                                        }) : null}
                                        <TableCell>
                                            <IconButton onClick={() => onClickRow(e)}>
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton onClick={() => onClickRow(e)}>
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                    </StyledTableRow>
                                })
                            ) : (
                                <TableRow className='table-light' scope='row'>
                                    <TableCell>1</TableCell>
                                    {colValue && colValue.length > 0 ? colValue.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((x, i) => {
                                        return <TableCell key={i}>Data Not Found</TableCell>
                                    }) : null}
                                </TableRow>
                            )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={colValue.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}