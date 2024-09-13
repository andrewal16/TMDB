import React, { useState } from "react";
import MoviePopular from "../pages/moviePopular";
import MovieUpComing from "../pages/movieUpComing";
import MovieList from "../pages/movieList";
const TabMenu: React.FC = () => {
  const [activeTab, setActiveTab] = useState('nowPlaying');

  const renderContent = () => {
    switch (activeTab) {
      case 'popular':
        return <MoviePopular />;
      case 'upcoming':
        return <MovieUpComing />;
      case 'nowPlaying':
      default:
        return <MovieList />;
    }
  };

  return (
    <div className="w-full">
      <div className="tabs tabs-boxed justify-center">
        <a
          className={`tab ${activeTab === 'nowPlaying' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('nowPlaying')}
        >
          Now Playing
        </a>
        <a
          className={`tab ${activeTab === 'popular' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('popular')}
        >
          Popular
        </a>
        <a
          className={`tab ${activeTab === 'upcoming' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </a>
      </div>

      <div className="p-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default TabMenu;
