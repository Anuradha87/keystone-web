const API_URL = "http://localhost:5098/api";

export const searchCourses = async (query,pageNumber,pageSize=5) => {
  try {
    const response = await fetch(`${API_URL}/course/search?query=${query}&pageSize=${pageSize}&pageNumber=${pageNumber}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
};