// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React from 'react';
import { WpPosts } from '../../Modals/WpPost';
import withAuthProvider, { AuthComponentProps } from '../../Authentication/WpAuthProvider';
import { Stack, SpinnerSize, Spinner, IStackItemStyles, Label, Link, ActivityItem, Icon, mergeStyleSets, Text } from "@fluentui/react";
import { getWPSinglePost, getWPSinglePostComments } from '../../Services/WPService';
import parse from 'html-react-parser'
import { WpPostCommentsModel } from '../../Modals/WpComment';
import MetaInfo from '../../Components/MetaInfo';
import { RoutesConfig } from '../../Helpers/routes.config';
import { array } from 'prop-types';
interface WpPostState {
  loading: boolean,
  post: WpPosts | null,
  accessToken: string;
  error: String;
  id: number;
  comments: WpPostCommentsModel[];
  activityComments: activityComments[];
}
interface activityComments {
  key: number;
  activityDescription: JSX.Element[];
  activityIcon: JSX.Element;
  comments: JSX.Element[];
  timeStamp: string;
}

class PostDetails extends React.Component<AuthComponentProps, WpPostState>{
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      post: null,
      comments: [],
      activityComments: [],
      accessToken: localStorage.getItem("token") || '',
      error: '',
      id: this.props.id
    };

  }
  createMarkup = (data: any) => ({
    __html: data
  });


  async componentDidMount() {    // let loginInfo:WpLogin =  new WpLogin();
    // loginInfo.username = config.WpUser.username;
    // loginInfo.password = config.WpUser.password;
    //var accessToken = await this.props.getAccessToken(loginInfo);

    let id: number = this.props.id;
    if (this.state.accessToken !== "" && id && id > 0) {
      this.setState({ loading: true }, async () => {
        await getWPSinglePost(this.state.accessToken, id).then(res => {
          if (res) {
            this.setState({
              loading: false,
              post: res
            });
            this._bindComments(id);
          } else {
            this.setState({
              loading: false,
              error: 'No Posts Found'
            });
          }
        }).catch(
          err => this.setState({
            loading: false,
            error: err.message
          })
        );

      }
      )
    }

  }

  async _bindComments(id: number) {
    const classNames = mergeStyleSets({
      nameText: {
        fontWeight: 'bold',
      },
    });
    this.setState({ loading: true }, async () => {
      await getWPSinglePostComments(this.state.accessToken, id).then(res => {
        if (res) {
          this.setState({
            loading: false,
            comments: res
          });
          let itemsArray:any = [];
          res.forEach(element => {
            itemsArray.push({
              key: element.id,
              activityDescription: [
                <Link key={1} className={classNames.nameText} href="">
                  {element.author_name}
                </Link>,
                <span key={2}> commented</span>,
              ],
              activityIcon: <Icon iconName={'Message'} />,
              comments: [
                <span key={1}>{parse(element.content.rendered)}</span>
              ],
              timeStamp: element.date
            })
          });
          this.setState({
            activityComments: itemsArray
          });

        } else {
          this.setState({
            loading: false,
            error: 'No Posts Found'
          });
        }
      }).catch(
        err => this.setState({
          loading: false,
          error: err.message
        })
      );
    })

  }
  // <renderSnippet>
  render() {
    //Styling
    const stackItemStyles: IStackItemStyles = {
      root: {
        padding: 10,
        marginTop: 20,
        marginBottom: 20
      },
    };
    const classNames = mergeStyleSets({
      exampleRoot: {
        marginTop: '20px',
      },
      nameText: {
        fontWeight: 'bold',
      },
    });
    const { loading, post, error, comments } = this.state;
    return (
      <Stack styles={stackItemStyles}>
        <MetaInfo title={RoutesConfig.PostDetails.metaInfo.title} description={RoutesConfig.PostDetails.metaInfo.title}></MetaInfo>
        {loading && <Spinner size={SpinnerSize.large} />}
        {error && <div className="alert alert-danger" dangerouslySetInnerHTML={this.createMarkup(error)} />}
        {post ?
          (<Stack gap="10">
            <Label>{post.title ? post.title.rendered : ""}</Label>
            <Text>{post.excerpt ? parse(post.content!.rendered) : ''}</Text>
            <Link href={post.link} target="_blank">See Post</Link>
            <br />
          </Stack>) : ''
        }
        {comments ? this.state.activityComments.map((item: { key: string | number }) => (
          <ActivityItem {...item} key={item.key} className={classNames.exampleRoot} />
        )) : ""}
      </Stack>
    );
  }
  // </renderSnippet>
}

export default withAuthProvider(PostDetails);
