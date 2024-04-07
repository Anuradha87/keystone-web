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
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});

  const classes = useStyles();

  const openPopup = () => {
    const selectedItems = props.data.courses.filter(repo => checkedItems[repo.id]);
    setSelectedRepo(selectedItems);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setSelectedRepo(null);
  };

  const handleCheckboxChange = (id) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleButtonClick = () => {
    const checkedCourses = props.data.courses.filter(repo => checkedItems[repo.id]);
    if (checkedCourses.length === 0) {
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
            checked={!!checkedItems[reposinfoz.id]}
            onChange={() => handleCheckboxChange(reposinfoz.id)}
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
      {popupOpen && <Popup repo={selectedRepo} onClose={closePopup} />}
    </div>
  );
};

export default Repoz;
