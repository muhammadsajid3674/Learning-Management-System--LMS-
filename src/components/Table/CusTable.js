import React from 'react'

function CusTable(props) {

    const { headDataSource, bodyDataSource, ObjKey  } = props

    return (
        <>
            <table className="table table-bordered w-90 table-striped mt-2" style={{ fontSize: '0.8rem' }}>
                <thead>
                    <tr>
                        {headDataSource.map((e,i) => {
                            return <th key={i}>{e}</th>
                        })}
                    </tr>
                </thead>
                {bodyDataSource.map((e, i) => {
                    return <tbody key={i}>
                        <tr>
                            <td>{i}</td>
                            <td>{e}</td>
                        </tr>
                    </tbody>
                })}
            </table>
        </>
    )
}

export default CusTable