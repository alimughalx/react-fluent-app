import React from 'react';
import { Icon } from "@fluentui/react";

export type MetaInfoProps = {
  readonly title?: string;
  readonly description?: string;
};

export type Route = {
  readonly path: string;
  readonly icon: string;
  readonly exact?: boolean;
  readonly displayName: string;
  readonly activeClassName: string;
  readonly metaInfo: MetaInfoProps;
};

export const RoutesConfig = Object.freeze<Record<string, Route>>({
  Home: {
    path: '/',
    exact: true,
    displayName: 'Home',
    activeClassName: 'is-active',
    icon: 'Message',
    metaInfo: {
      title: 'Home | React SPA by Ali',
      description: 'Home page description - limit of 160 characters (try for 150-155).'
    }
  },
  Calendar: {
    path: '/calendar',
    exact: true,
    displayName: 'Calander',
    activeClassName: 'is-active',
    icon: 'info',
    metaInfo: {
      title: 'Calander | React SPA by Ali',
      description: 'Calander page description - limit of 160 characters (try for 150-155).'
    }
  },
  PostDetails: {
    path: '/postDetails/:id',
    exact: true,
    displayName: 'Post Details',
    activeClassName: 'is-active',
    icon: 'info',
    metaInfo: {
      title: 'Post Details | React SPA by Ali',
      description: 'Post Details page description - limit of 160 characters (try for 150-155).'
    }
  },
  CreatePost: {
    path: '/createPost',
    exact: true,
    displayName: 'Create Post',
    activeClassName: 'is-active',
    icon: 'info',
    metaInfo: {
      title: 'Create Post | React SPA by Ali',
      description: 'Create Post page description - limit of 160 characters (try for 150-155).'
    }
  },
  NewEvent: {
    path: '/newevent',
    exact: true,
    displayName: 'New Event',
    activeClassName: 'is-active',
    icon: 'info',
    metaInfo: {
      title: 'New Event | React SPA by Ali',
      description: 'New Event page description - limit of 160 characters (try for 150-155).'
    }
  },
  RSS: {
    path: '/rss',
    exact: true,
    displayName: 'RSS External Content',
    activeClassName: 'is-active',
    icon: 'info',
    metaInfo: {
      title: 'External Content | React SPA by Ali',
      description: 'External Content page description - limit of 160 characters (try for 150-155).'
    }
  }
});