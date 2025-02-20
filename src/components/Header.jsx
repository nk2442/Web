function Header() {
  return (
    <header className="dashboard-header">
      <div className="logo">
        <h1>MessageApp</h1>
      </div>
      
      <div className="search-zone">
        <div className="search-container">
          <label htmlFor="search">🔍</label>
          <input id="search" placeholder="Search messages..." />
        </div>
        <div className="date-filters">
          <div className="date-input">
            <label htmlFor="date_deb">From:</label>
            <input type="date" id="date_deb" />
          </div>
          <div className="date-input">
            <label htmlFor="date_fin">To:</label>
            <input type="date" id="date_fin" />
          </div>
          <button type="submit">Search</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
