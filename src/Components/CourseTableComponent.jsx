import React, { useState } from 'react';
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
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import MessageBox from './MessageBox'; 
import Popup from './ContactDetailsPopup'; 
import './customStyles.css'; 

const Repoz = (props) => {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);

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
      <TableRow key={reposinfoz.id} className="custom-table-row">
        <TableCell>
          <Checkbox
            color="primary"
            checked={selectedCourses.some(selectedCourse => selectedCourse.id === reposinfoz.id)}
            onChange={() => handleCheckboxChange(reposinfoz)}
            className="custom-checkbox"
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
      <div className="custom-button-container">
        <Button onClick={handleButtonClick} variant="contained" color="primary">
          Send us your choices
        </Button>
      </div>
      <TableContainer component={Paper} className="custom-table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="custom-table-header-cell"></TableCell>
              <TableCell className="custom-table-header-cell">Course Name</TableCell>
              <TableCell className="custom-table-header-cell">Institute</TableCell>
              <TableCell className="custom-table-header-cell">Lecture Method</TableCell>
              <TableCell className="custom-table-header-cell">Location</TableCell>
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
        className="custom-pagination"
      />
      {popupOpen && <Popup repo={selectedCourses} onClose={() => setPopupOpen(false)} />}
    </div>
  );
};

export default Repoz;