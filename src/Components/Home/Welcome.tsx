// <WelcomeSnippet>
import React from 'react';
import { Button, Stack, DefaultPalette, Label } from "@fluentui/react";
import WpPost from '../WPPost/Posts';
import MetaInfo from '../../Components/MetaInfo';
import { RoutesConfig } from '../../Helpers/routes.config';
interface WelcomeProps {
  isAuthenticated: boolean;
  authButtonMethod: any;
  user: any;
}

interface WelcomeState {
  isOpen: boolean;
}

function WelcomeContent(props: WelcomeProps) {
  // If authenticated, greet the user
  if (props.isAuthenticated) {
    return (
      <Stack>
        <Label>Welcome <span style={{ "color": DefaultPalette.themeSecondary }}>{props.user.displayName}</span></Label>
      </Stack>
    );
  }

  // Not authenticated, present a sign in button
  return <Button color="primary" primary onClick={props.authButtonMethod}>Click here to sign in</Button>;
}
//Styling
//Styling
export default class Welcome extends React.Component<WelcomeProps, WelcomeState> {
  render() {
    return (
      <Stack>
        <MetaInfo title={RoutesConfig.Home.metaInfo.title} description={RoutesConfig.Home.metaInfo.description}></MetaInfo>
        <Label>Fluent React Graph</Label>
        <Label>Contoso Denver expansion design marketing hero guidelines</Label>
        {!this.props.isAuthenticated ? (<Label>Want to interact with Graph?</Label>) : ""}
        <WelcomeContent
          isAuthenticated={this.props.isAuthenticated}
          user={this.props.user}
          authButtonMethod={this.props.authButtonMethod} />
        {this.props.isAuthenticated ? <WpPost /> : ""}
      </Stack>
    );
  }
}
// </WelcomeSnippet>
