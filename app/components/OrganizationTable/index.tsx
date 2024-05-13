

'use client'
import { ApiCaller } from '@/app/helpers/apiHelper'
import React,{useState,useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import { IconButton } from '@mui/material';
import {Address,ColumnData,Data,columns} from './types'
import {useRouter} from 'next/navigation'
import { NotifyType, notify } from '@/app/helpers/toast';




const VirtuosoTableComponents: TableComponents<Data> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={'left'}
          style={{ width: column.width }}
          sx={{
            backgroundColor: 'background.paper',
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index: number, row: Data) {

  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
        >
          {row[column.dataKey] }
         
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function OrganizationTable() {

   const [organizations,setOrganizations]= useState([])
useEffect(()=>{
const getList = async()=>{
  const list = await ApiCaller.getOrganizationsList();
  if(Array.isArray(list)){
    setOrganizations(list);
  }

}
getList();

},[])
  return (
    <Paper style={{ height: '800px', width: '80%',margin:'auto',marginTop:'24px' }}>
      <TableVirtuoso
        data={organizations}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
