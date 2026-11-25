import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function Show() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [rating, setRating] = useState(8);
  const [reviewText, setReviewText] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);

    axios.get(API_URL + '/api/shows/' + id)
      .then(r => setShow(r.data))
      .catch(e => console.error(e));
  }, [id]);

  const handleWatchlist = async (status) => {
    if (!isLoggedIn) return alert('Please log in to update your watchlist.');
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${API_URL}/api/users/me/watchlist`, 
        { showId: id, status, currentEpisode: 1 }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Status set to ${status}!`);
    } catch (err) {
      alert('Failed to update watchlist. Check console.');
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) return alert('Please log in to post a review.');
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${API_URL}/api/shows/${id}/review`, 
        { rating, text: reviewText }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Review posted successfully! Average rating recalculated.');
      const refreshedShow = await axios.get(API_URL + '/api/shows/' + id);
      setShow(refreshedShow.data);

    } catch (err) {
      alert('Failed to post review. Check console.');
    }
  };

  if (!show) return <div>Loading show details...</div>;
const currentEp = show.currentEpisode || 1;
const progressPercent = show.currentEpisode > 0 ? (show.currentEpisode / show.totalEpisodes) * 100 : 0;

<div style={{ marginTop: '15px' }}>
  <strong>Progress:</strong> {show.currentEpisode} / {show.totalEpisodes} Episodes
  <div style={{ background: '#ddd', height: '10px', borderRadius: '5px', overflow: 'hidden', marginTop: '5px' }}>
    <div style={{ width: `${progressPercent}%`, height: '100%', background: '#007bff', transition: 'width 0.5s' }}></div>
  </div>
  <small style={{ color: '#007bff' }}>{progressPercent.toFixed(1)}% Complete</small>
</div>

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
      <h2>{show.title} ({show.year})</h2>
      <img src={show.posterUrl} alt={show.title} style={{ width: '300px', float: 'left', marginRight: '20px' }} />
      <div>
        <p><strong>Type:</strong> {show.type}</p>
        <p><strong>Episodes:</strong> {show.totalEpisodes}</p>
        <p><strong>Genres:</strong> {show.genres?.join(', ')}</p>
        <p><strong>Description:</strong> {show.description}</p>
        <h3 style={{color: 'gold'}}>Average Rating: {show.averageRating ? show.averageRating.toFixed(1) + '/10' : 'Unrated'}</h3>

        {isLoggedIn && (
          <div style={{ marginBottom: '20px' }}>
            <select onChange={(e) => handleWatchlist(e.target.value)} defaultValue="Watching" style={{padding: '8px', marginRight: '10px'}}>
                <option value="Watching">Watching</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
                <option value="Dropped">Dropped</option>
                <option value="Plan to Watch">Plan to Watch</option>
            </select>
            <button onClick={() => alert('Feature: Episode progress tracking built into next steps!')}>Update Episode (1)</button>
          </div>
        )}
        {!isLoggedIn && <p>Log in to track this show and post reviews.</p>}
      </div>

      <div style={{ clear: 'both', marginTop: '30px' }}>
         <h3>Post a Review</h3>
         {isLoggedIn ? (
           <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
             <input type="number" min="1" max="10" placeholder="Rating (1-10)" value={rating} onChange={e => setRating(Number(e.target.value))} required style={{padding: '8px'}}/>
             <textarea placeholder="Your thoughts..." value={reviewText} onChange={e => setReviewText(e.target.value)} required style={{padding: '8px'}}/>
             <button type="submit" style={{padding: '10px'}}>Submit Review</button>
           </form>
         ) : (
             <p>Please <Link to="/login">log in</Link> to post a review.</p>
         )}

         <h3 style={{ marginTop: '30px' }}>Community Reviews:</h3>
         <p>Review display logic is minimal for Capstone demo.</p>
      </div>
    </div>
  );
}