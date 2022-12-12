import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';

function CusDataTable(props) {

    const { dataSource, colValue, onClickRow } = props

    return (
        <>
            {colValue && Array.isArray(colValue) && (
                <div style={{ overflowX: 'auto' }}>
                    <table className='table table-responsive table-bordered mt-3' style={{ fontSize: '0.8rem' }}>
                        <thead>
                            <tr className='table-dark'>
                                <th>#</th>
                                {colValue && colValue.length > 0 ? colValue.map((e, i) => {
                                    return <th scope="col" key={i}>{e.name}</th>
                                }) : null}
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataSource && Array.isArray(dataSource) && dataSource.length > 0 ? (
                                dataSource.map((e, i) => {
                                    return <tr scope='row' key={i}>
                                        <th>{i + 1}</th>
                                        {colValue && colValue.length > 0 ? colValue.map((x, i) => {
                                            return <td key={i}>{e[x.key]}</td>
                                        }) : null}
                                        <td>
                                            <IconButton onClick={() => onClickRow(e)}>
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton onClick={() => onClickRow(e)}>
                                                <EditIcon />
                                            </IconButton>
                                        </td>
                                    </tr>
                                })
                            ) : (
                                <tr className='table-light' scope='row'>
                                    <th>1</th>
                                    {colValue && colValue.length > 0 ? colValue.map((x, i) => {
                                        return <td key={i}>Data Not Found</td>
                                    }) : null}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}

export default CusDataTable