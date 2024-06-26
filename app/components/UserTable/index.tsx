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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {Address,ColumnData,Data,columns} from './types'
import {useRouter} from 'next/navigation'
import { NotifyType, notify } from '@/app/helpers/toast';

  const token = localStorage.getItem('token');
    const arrayTokens = token?.split('.');
    const tokenPayload = JSON.parse(atob(arrayTokens[1]));


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
  const router = useRouter();


  const deleteUser= async(id:string)=>{
    try {
    await ApiCaller.removeUserInfo(id);
    window.location.reload();
    } catch (error) {
    notify(`User Deleted Failed : ${error.message}`,NotifyType.ERROR)

      
    }

  }

  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
        >
          {row[column.dataKey] ||row.addresses[0][column.dataKey] }
          {
              column.dataKey==='action' && localStorage && <>
          <IconButton disabled={tokenPayload.sub===row._id || localStorage.getItem('role') === 'user'  } onClick={()=>{deleteUser(row._id)}}  >
          <DeleteIcon className={`${tokenPayload.sub===row._id || localStorage.getItem('role') === 'user' ? 'text-gray-400' : 'text-red-600'} `} />
          </IconButton>
          <IconButton disabled={tokenPayload.sub!==row._id && localStorage.getItem('role') === 'user'} onClick={()=> router.push(`/users/${row._id}/Edit`)}  >
          <EditIcon className={`${tokenPayload.sub!==row._id && localStorage.getItem('role') === 'user'  ? 'text-gray-400' : 'text-primary'}`} />
          </IconButton>
          <IconButton onClick={()=> router.push(`/users/${row._id}`)}  >
          <RemoveRedEyeIcon className='text-primary' />
          </IconButton>
              </>
          }
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function UserTable() {

   const [userList,setUserList]= useState([])
useEffect(()=>{
const getList = async()=>{
  const list = await ApiCaller.getUserList();
  if(Array.isArray(list)){
    setUserList(list);
  }

}
getList();

},[])
  return (
    <Paper style={{ height: '800px', width: '80%',margin:'auto',marginTop:'24px' }}>
      <TableVirtuoso
        data={userList}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
