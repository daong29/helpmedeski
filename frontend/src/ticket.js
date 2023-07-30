import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Axios from 'axios'
import { useState , useEffect} from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Ticket() {
    const [ticket, setTicket] = useState([]);

    useEffect(() => {
      Axios.get('http://localhost:5000/ticket')
      .then(res => {
        setTicket(res.data);
      })
    }, [])
  
  return (
    
    <TableContainer component={Paper}>
      <box>
      <Button sx={{ m: 1, bgcolor: 'Green'}} component="a" variant="contained" href='/create'  align = "right">
            create
          </Button> 
      </box>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
        
            <TableCell>id</TableCell>
            <TableCell align="right">name</TableCell>
            <TableCell align="right">description</TableCell>
            <TableCell align="right">contact</TableCell>
            <TableCell align="right">information</TableCell>
            <TableCell align="right">option</TableCell>
            <TableCell align="right">status</TableCell>
        

          </TableRow>
        </TableHead>
        <TableBody>
          {ticket.map((val) => (
            <TableRow
              key={val.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {val.id}
              </TableCell>
              <TableCell align="right">{val.name}</TableCell>
              <TableCell align="right">{val.description}</TableCell>
              <TableCell align="right">{val.contact}</TableCell>
              <TableCell align="right">{val.information}</TableCell>
               <TableCell align="right"><Link href={'/edit/'+val.id}>
                <Button variant="contained" color="error" >Edit</Button>
                </Link>
                </TableCell>
               <TableCell align="right"><Button variant="contained" color="success">pending</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
        <div className="App-table">
    </div>
      </Table>
    </TableContainer>
    
  );
}
