import React from 'react';
import { Link } from 'react-router-dom';

<Link to="/?genre=Action">Action</Link> 

export default function Sidebar() {
  const genres = ['Action', 'Comedy', 'Drama', 'Mystery', 'Fantasy', 'Sci-Fi'];

  return (
    <div className="sidebar-content" style={{ padding: '10px' }}>
      
      <h3 style={{ borderBottom: '1px solid #444', paddingBottom: '10px' }}>Genres</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
        {genres.map(genre => (
          <Link to={`/browse?genre=${genre}`} key={genre} style={{ 
            backgroundColor: '#3a3f44', padding: '5px 10px', borderRadius: '4px', textAlign: 'center', color: '#ccc'
          }}>
            {genre}
          </Link>
        ))}
      </div>

      <h3 style={{ borderBottom: '1px solid #444', padding: '20px 0 10px' }}>Top 03</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li style={{ marginBottom: '10px' }}>01. Naruto</li>
        <li style={{ marginBottom: '10px' }}>02. Death Note</li>
        <li style={{ marginBottom: '10px' }}>03. Fullmetal Alchemist</li>
      </ul>

    </div>
  );
}