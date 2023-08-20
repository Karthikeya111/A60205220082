import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TableContainer, Table, Paper, TableCell, TableRow, TableHead, TableBody, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Trains() {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/trains')
      .then((response) => {
        setTrains(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching train data:', error);
      });
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: 'auto' }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom style={{ color: 'white', backgroundColor: 'black', fontFamily:'poppins', borderRadius:'5px'}}>
        Status Of All Trains
      </Typography>
      <TableContainer component={Paper} style={{ backgroundColor: '#FFFFFF' }}>
        <Table style={{fontFamily:"gorgia"}}>
          <TableHead>
            <TableRow style={{ borderRadius: '5px',fontFamily:"gorgia"}}>
              <TableCell style={{ color: '#FFFFFF', backgroundColor: 'blue' }}>Train Name</TableCell>
              <TableCell align="right" style={{ color: '#FFFFFF', backgroundColor: 'blue' }}>Train ID/No</TableCell>
              <TableCell align="right" style={{ color: '#FFFFFF', backgroundColor: 'blue' }}>Time of Departure</TableCell>
              <TableCell align="right" style={{ color: '#FFFFFF', backgroundColor: 'blue' }}>Available Seats</TableCell>
              <TableCell align="right" style={{ color: '#FFFFFF', backgroundColor: 'blue' }}>Cost for (Sleeper)</TableCell>
              <TableCell align="right" style={{ color: '#FFFFFF', backgroundColor: 'blue' }}>Cost for(AC)</TableCell>
              <TableCell align="center" style={{ color: '#FFFFFF', backgroundColor: 'blue' }}>Show more</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trains?.map((train) => (
              <TableRow key={train.trainNumber}>
                <TableCell>{train.trainName}</TableCell>
                <TableCell align="right">{train.trainNumber}</TableCell>
                <TableCell align="right">{train.departureTime}</TableCell>
                <TableCell align="right">{train.seatsAvailable}</TableCell>
                <TableCell align="right">{train.price.sleeper}</TableCell>
                <TableCell align="right">{train.price.AC}</TableCell>
                <TableCell align="center">
                  <Button
                    component={Link}
                    to={`/trains/${train.trainNumber}`}
                    variant="contained"
                    color="inherit"
                    style={{ backgroundColor: 'black', color:'white', fontFamily:'gorgia'}}
                  >
                    Single Train Status
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Trains;
