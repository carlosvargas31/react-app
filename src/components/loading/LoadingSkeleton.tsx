import React from 'react';
import './LoadingSkeleton.css';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="loading-skeleton">
      <div className="skeleton-header"></div>
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-line skeleton-detail"></div>
        <div className="skeleton-line skeleton-detail"></div>
        <div className="skeleton-line skeleton-detail"></div>
      </div>
    </div>
  );
};

export const SpellGridSkeleton: React.FC = () => {
  return (
    <div className="spell-grid">
      {Array.from({ length: 8 }).map((_, index) => (
        <LoadingSkeleton key={index} />
      ))}
    </div>
  );
};
