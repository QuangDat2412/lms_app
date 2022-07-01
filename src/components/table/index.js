import React from 'react';
import { CTable, CTableHead, CTableRow, CTableBody, CTableHeaderCell, CTableDataCell } from '@coreui/react';
import PropTypes from 'prop-types';
import './index.scss';
const TableCustom = ({ datas }) => {
    const { header, data, actions } = datas;
    return (
        <>
            <CTable>
                <CTableHead>
                    <CTableRow>
                        {header.map((h, i) => {
                            return (
                                <CTableHeaderCell key={i} style={{ width: h.width }}>
                                    {h.value}
                                </CTableHeaderCell>
                            );
                        })}
                        {actions.length > 0 && <CTableHeaderCell key={-1}>Hành động</CTableHeaderCell>}
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {data.map((d, i) => {
                        return (
                            <CTableRow key={i}>
                                {header.map((h, j) => {
                                    if (h.type === 'status') {
                                        return (
                                            <CTableDataCell key={j}>
                                                <div
                                                    style={{
                                                        color: '#fff',
                                                        backgroundColor: `${d[h.key] === 1 ? '#2eb85c' : 'red'}`,
                                                        padding: '3px',
                                                        borderRadius: '5px',
                                                        width: '140px',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    {d[h.key] === 1 ? 'Đang hoạt động' : 'Ngừng hoạt dộng'}
                                                </div>
                                            </CTableDataCell>
                                        );
                                    } else if (h.type === 'html') {
                                        return (
                                            <CTableDataCell key={j}>
                                                <span dangerouslySetInnerHTML={{ __html: d[h.key] }} className="wrapword"></span>
                                            </CTableDataCell>
                                        );
                                    } else {
                                        return <CTableDataCell key={j}>{d[h.key]}</CTableDataCell>;
                                    }
                                })}
                                <CTableDataCell className="d-flex justify-content-between">
                                    {actions.map((action, i) => {
                                        return (
                                            <a
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    action.openMoDalAdd(d, action.key);
                                                }}
                                                href="/"
                                                key={i}
                                            >
                                                {action.value}
                                            </a>
                                        );
                                    })}
                                </CTableDataCell>
                            </CTableRow>
                        );
                    })}
                </CTableBody>
            </CTable>
        </>
    );
};
TableCustom.propTypes = {
    datas: PropTypes.object,
    openMoDalAdd: PropTypes.func,
};
export default TableCustom;
