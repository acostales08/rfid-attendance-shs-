import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';
import { TextField } from '@mui/material';

const ControlledDataTable = (props) => {
  const {
    columns,
    data,
    loading,
    title,
    pagination,
    selectableRows,
    onFilter,
    defaultSearchValue,
    customStyles,
    children
  } = props;

  const [search, setSearch] = useState(defaultSearchValue || '');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (onFilter) {
      const filtered = onFilter(data, search);
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [data, search, onFilter]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className='p-4 pt-5'>
      <DataTable
        loading={loading}
        title={title}
        columns={columns}
        data={filteredData}
        selectableRows={selectableRows}
        pagination={pagination}
        striped='true'
        highlightOnHover='true'
        dense
        theme='default'
        customStyles={customStyles}
        subHeader
        subHeaderComponent={
          <div className='gap-2 flex'>
            <TextField
              label="search here....."
              size='small'
              onChange={handleSearchChange}
              value={search}
            />  
            {children}             
          </div>
        }
      />
    </div>
  );
};

ControlledDataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  title: PropTypes.string,
  pagination: PropTypes.bool,
  selectableRows: PropTypes.bool,
  onFilter: PropTypes.func,
  defaultSearchValue: PropTypes.string,
  customStyles: PropTypes.object,
};

export default ControlledDataTable;
