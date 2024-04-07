import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import Pagination from '@mui/material/Pagination';
import MessageBox from './MessageBox'; // Import your MessageBox component
import Popup from './ContactDetailsPopup'; // Import your Popup component

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    margin: 'auto',
    marginTop: '20px',
  },
  tableHeaderCell: {
    fontWeight: 'bold !important',
    backgroundColor: '#BBDEFB',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '20px',
  },
  tableRow: {
    '&:hover': {
      backgroundColor: '#F5F5F5',
    },
    padding: '5px !important',
  },
  checkbox: {
    '&.Mui-checked': {
      color: '#28a745 !important',
    },
  },
  pagination: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Repoz = (props) => {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const classes = useStyles();

  const openPopup = () => {
    setPopupOpen(true);
  };

  const handleCheckboxChange = (course) => {
    const index = selectedCourses.findIndex(selectedCourse => selectedCourse.id === course.id);
    if (index === -1) {
      setSelectedCourses([...selectedCourses, course]);
    } else {
      setSelectedCourses(selectedCourses.filter(selectedCourse => selectedCourse.id !== course.id));
    }
  };

  const handleButtonClick = () => {
    if (selectedCourses.length === 0) {
      setMessage('Please select at least one course');
      setShowMessage(true);
      return;
    }
    openPopup();
  };

  const handlePageChange = (event, page) => {
    props.onPageChange(event, page);
  };

  const renderCourses = () => {
    return props.data.courses.map((reposinfoz) => (
      <TableRow key={reposinfoz.id} className={classes.tableRow}>
        <TableCell>
          <Checkbox
            color="primary"
            checked={selectedCourses.some(selectedCourse => selectedCourse.id === reposinfoz.id)}
            onChange={() => handleCheckboxChange(reposinfoz)}
            className={classes.checkbox}
          />
        </TableCell>
        <TableCell>{reposinfoz.name}</TableCell>
        <TableCell>{reposinfoz.institute}</TableCell>
        <TableCell>{reposinfoz.deliveryMethod}</TableCell>
        <TableCell>{reposinfoz.location}</TableCell>
      </TableRow>
    ));
  };

  return (
    <div>
      {showMessage && <MessageBox message={message} onClose={() => setShowMessage(false)} />}
      <div className={classes.buttonContainer}>
        <Button onClick={handleButtonClick} variant="contained" color="primary">
          Send us your choices
        </Button>
      </div>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}></TableCell>
              <TableCell className={classes.tableHeaderCell}>Course Name</TableCell>
              <TableCell className={classes.tableHeaderCell}>Institute</TableCell>
              <TableCell className={classes.tableHeaderCell}>Delivery Method</TableCell>
              <TableCell className={classes.tableHeaderCell}>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderCourses()}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Pagination
        count={Math.ceil(props.data.totalCourses / props.reposPerPage)}
        page={props.currentPage}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        className={classes.pagination}
      />
      {popupOpen && <Popup repo={selectedCourses} onClose={() => setPopupOpen(false)} />}
    </div>
  );
};

export default Repoz;
