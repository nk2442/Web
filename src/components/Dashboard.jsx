import Header from './Header';
import MessageSection from './MessageSection';

function Dashboard() {
  return (
    <div className="dashboard">
      <Header />
      <main className="dashboard-main">
        <aside className="sidebar">
          <nav>
            <ul>
              <li>Messages</li>
              <li>Profile</li>
              <li>Settings</li>
            </ul>
          </nav>
        </aside>
        <MessageSection />
      </main>
    </div>
  );
}

export default Dashboard;
