import React from 'react'
import './ShowHistory.css';

const ShowHistory = ({ searchHistory }) => {
  return (
    <div className='history-container'>
      <h4>Search History</h4>
      {
        searchHistory.map((i, index) => (
          <li key={index}>{i}</li>
        ))

      }
    </div>

  )
}

export default ShowHistory