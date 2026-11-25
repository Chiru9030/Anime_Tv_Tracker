import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
export default function Home() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;
  const location = useLocation(); 

  useEffect(() => {
    setLoading(true);
    
    const params = new URLSearchParams(location.search);
    const selectedGenre = params.get('genre'); 
    
    const endpoint = selectedGenre 
      ? `${API_URL}/api/shows?genre=${selectedGenre}` 
      : `${API_URL}/api/shows`;

    axios.get(endpoint)
      .then(response => {
        setShows(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching shows:', error);
        setShows([]);
        setLoading(false);
      });
      
  }, [location.search, API_URL]); 

  return (
    <div className="content-container"> 
      <h2>Explore Anime & TV Series</h2>
      {loading ? (
        <p>Loading shows... (If this persists, check network tab and backend.)</p>
      ) : (
        <>
          {shows.length === 0 ? (
            <p style={{marginTop: '20px', color: 'red'}}>No shows found matching the current criteria. Try selecting a different genre.</p>
          ) : (
            <div className="grid">
              {shows.map(show => (
                show && show.title ? ( 
                  <div className="card" key={show._id}>
                    <img src={show.posterUrl || 'https://via.placeholder.com/150/000000/FFFFFF?text=AT'} alt={show.title} />
                    <h3>{show.title}</h3>
                    <p>{show.genres?.join(', ') || 'No Genres'}</p> 
                    <Link to={'/show/' + show._id}>View Details</Link>
                  </div>
                ) : null
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}