import React, { useState, useEffect } from "react";
import Repoz from './CourseTableComponent';
import { searchCourses } from '../Services/CourseService';
import SearchForm from './SearchForm';

const KeystoneCourseSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({
    courses: [],
    totalCourses: 0
  });
  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 5;

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const searchData = await searchCourses(searchText, currentPage, reposPerPage);
        setData({
          courses: searchData.courses,
          totalCourses: searchData.totalCourses
        });
      } catch (error) {
        console.error("Oops! There Is A Problem", error);
      }
    };

    fetchSearch();
  }, [searchText, currentPage, reposPerPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSearch = (searchText) => {
    setSearchText(searchText);
    setCurrentPage(1); // Reset current page when search changes
  };

  return (
    <div className="main-cont">
        <br></br>
      <div className="container">
        <div className="clearfix srchtype-slc">
          <div className="userslcd"></div>
          <div className="usersrch">
            <SearchForm onSearch={handleSearch}  />
          </div>
        </div>
      </div>
      <div className="container">
        <section className="users-container">
          <div className="row">
            <Repoz
              data={data}
              currentPage={currentPage}
              reposPerPage={reposPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default KeystoneCourseSearch;