import React, { useEffect } from 'react';
import { Icon } from "@fluentui/react";

const NotFound: React.FC = () => {
  useEffect(() => {
    if (window.location.pathname !== '/404') {
      window.location.href = '/404';
    }
  }, []);

  const notificationClassName = `notification tile is-child is-danger ${window ? window.location.pathname === '/404' ? 'rubberBand-animation' : 'hide' : 'hide'}`;

  return (
    <section className='container view-wrapper'>
      <div className='tile is-parent is-8 is-vertical is-notification-tile is-not-found-tile'>
        <div className={notificationClassName}>
          <div>
            <Icon iconName={'CloudNotSynced'} />
            <span className='title'>404 Not Found</span>
          </div>
          <p className='subtitle'>The requested page could not be found.</p>
        </div>
      </div>
    </section>
  );
};

export default NotFound;