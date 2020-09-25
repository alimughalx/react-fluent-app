import React from 'react';
import { WpPosts } from '../../Modals/WpPost';
import withAuthProvider, { AuthComponentProps } from '../../Authentication/WpAuthProvider';
import {
  Stack,
  IStackItemStyles,
  DocumentCard,
  DocumentCardImage,
  DocumentCardActivity,
  DocumentCardTitle,
  DocumentCardDetails,
  IIconProps,
  ImageFit,
  IDocumentCardStyles,
  Spinner,
  SpinnerSize
} from "@fluentui/react";
import { getWPPost } from '../../Services/WPService';
interface WpPostState {
  loading: boolean,
  posts: WpPosts[],
  error: String
}

class WpPost extends React.Component<AuthComponentProps, WpPostState>{
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      posts: [],
      error: ''
    };
  }
  createMarkup = (data: any) => ({
    __html: data
  });
  async componentDidMount() {
    // let loginInfo:WpLogin =  new WpLogin();
    // loginInfo.username = config.WpUser.username;
    // loginInfo.password = config.WpUser.password;
    // var accessToken = await this.props.getAccessToken(loginInfo);
    var accessToken = localStorage.getItem("token") || '';
    this.setState({ loading: true }, async () => {
      await getWPPost(accessToken).then(res => {
        if (res.length) {
          this.setState({
            loading: false,
            posts: res
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

    const { loading, posts, error } = this.state;

    const cardStyles: IDocumentCardStyles = {
      root: { display: 'inline-block', marginRight: 20, marginBottom: 20, width: 320 },
    };
    const oneNoteIconProps: IIconProps = {
      iconName: 'PostUpdate',
      styles: { root: { color: '#813a7c', fontSize: '70px', maxWidth: '120px', minHeight: '120px' } },
    };
    return (
      <Stack styles={stackItemStyles} horizontal>
        {loading && <Spinner size={SpinnerSize.large} />}
        {error && <div className="alert alert-danger" dangerouslySetInnerHTML={this.createMarkup(error)} />}
        {posts.length ? (
          posts.map(post => (
            <DocumentCard
              aria-label={
                'Document Card with icon. How to make a good design. ' +
                'Last modified by Christian Bergqvist in January 1, 2019.'
              }
              styles={cardStyles}
              onClickHref={post.link}
              key={post.id}>
              <DocumentCardImage height={150} imageFit={ImageFit.cover} iconProps={oneNoteIconProps} />
              <DocumentCardDetails>
                <DocumentCardTitle title={post.slug} shouldTruncate />
                {/* <DocumentCardTitle title={post.excerpt.rendered} shouldTruncate showAsSecondaryTitle/> */}
              </DocumentCardDetails>
              <DocumentCardActivity activity={post.date.toLocaleString()} people={[{ name: post.author.toString(), profileImageSrc: '' }]} />
            </DocumentCard>
          ))
        ) : ''}

      </Stack>
    );
  }
  // </renderSnippet>
}

export default withAuthProvider(WpPost);
