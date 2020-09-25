// <NavBarSnippet>
import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import { IIconProps, Persona, PersonaSize, IPersonaStyles, Panel, Stack, DefaultPalette, DefaultButton, PrimaryButton } from "@fluentui/react";
import { useBoolean } from '@uifabric/react-hooks';
import '../../index.css';
interface NavBarProps {
  isAuthenticated: boolean;
  authButtonMethod: any;
  user: any;
}

interface NavBarState {
  isOpen: boolean;
}
const addFriendIcon: IIconProps = { iconName: 'AddFriend' };
// function UserAvatar(props: any) {
//   // If a user avatar is available, return an img tag with the pic
//   if (props.user.avatar) {
//     return <img
//       src={props.user.avatar} alt="user"
//       className="rounded-circle align-self-center mr-2"
//       style={{ width: '32px' }}></img>;
//   }

//   // No avatar available, return a default icon
//   return <i
//     className="far fa-user-circle fa-lg rounded-circle align-self-center mr-2"
//     style={{ width: '32px' }}></i>;
// }

function AuthNavItem(props: NavBarProps) {
  const [isPanelOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
  const buttonStyles = { root: { marginRight: 8 } };
  // If authenticated, return a dropdown with the user's info and a
  // sign out button
  const onRenderFooterContent = React.useCallback(
    () => (
      
      <div>
        <PrimaryButton onClick={props.authButtonMethod} styles={buttonStyles}>
          Sign Out
        </PrimaryButton>
        <DefaultButton onClick={dismissPanel}>Cancel</DefaultButton>
      </div>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dismissPanel],
  );
  if (props.isAuthenticated) {
    const navPersonaStyles: Partial<IPersonaStyles> = { root: { margin: '0 0 10px 0', color: '#fff', cursor: 'pointer' }, primaryText: { color: DefaultPalette.white } };
    return (
      <Stack>
        <Persona onClick={openPanel} text={props.user.displayName} secondaryText={props.user.email} styles={navPersonaStyles} initialsColor={DefaultPalette.themePrimary} size={PersonaSize.size32} />
        <Panel
          headerText=""
          isOpen={isPanelOpen}
          onDismiss={dismissPanel}
          closeButtonAriaLabel="Close"
          isFooterAtBottom={true}
          onRenderFooterContent={onRenderFooterContent}>
          <Stack tokens={{ childrenGap: 10 }}>
            <Persona text={props.user.displayName} secondaryText={props.user.email} initialsColor={DefaultPalette.themePrimary} size={PersonaSize.size72} />
          </Stack>
        </Panel>
      </Stack>
    );
  }

  // Not authenticated, return a sign in link
  return (
    <NavItem>
      <PrimaryButton
        iconProps={addFriendIcon}
        allowDisabledFocus
        onClick={props.authButtonMethod}
        className="LoginBtn">Sign In</PrimaryButton>
    </NavItem>
  );
}

export default class NavBar extends React.Component<NavBarProps, NavBarState> {
  constructor(props: NavBarProps) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    // Only show calendar nav item if logged in
  
    let createPostDetailLink,createPostLink,calendarLink, rssLink = null;
    if (this.props.isAuthenticated) {
      calendarLink = (
        <NavItem>
          <RouterNavLink to="/calendar" className="nav-link" exact>Calendar</RouterNavLink>
        </NavItem>
      );
      createPostLink = (
        <NavItem>
          <RouterNavLink to="/createPost" className="nav-link" exact>Create Post</RouterNavLink>
        </NavItem>
      );
      createPostDetailLink = (
        <NavItem>
          <RouterNavLink to="/postDetails/23" isActive={(match: any, location: any) => location.pathname.includes('id')}
            className="nav-link" exact>Post</RouterNavLink>
        </NavItem>
      );
      rssLink = (
        <NavItem>
          <RouterNavLink to="/rss" isActive={(match: any, location: any) => location.pathname.includes('id')}
            className="nav-link" exact>RSS</RouterNavLink>
        </NavItem>
      );
    }

    return (
      <div>
        <Navbar color="dark" dark expand="md" fixed="top">
          <Container>
            <NavbarBrand href="/">Fluent React</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <RouterNavLink to="/" className="nav-link" exact>Home</RouterNavLink>
                </NavItem>
                {calendarLink}
                {createPostLink}
                {createPostDetailLink}
                {rssLink}
              </Nav>
              <Nav className="justify-content-end" navbar>
                <AuthNavItem
                  isAuthenticated={this.props.isAuthenticated}
                  authButtonMethod={this.props.authButtonMethod}
                  user={this.props.user} />
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
// </NavBarSnippet>
