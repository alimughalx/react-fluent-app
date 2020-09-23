import React from 'react';
import { WpPosts, WpPostsCreateModel } from '../../Modals/WpPost';
import withAuthProvider, { AuthComponentProps } from '../../Authentication/WpAuthProvider';
import MetaInfo from '../../Components/MetaInfo';
import { RoutesConfig } from '../../Helpers/routes.config';
import { Stack, SpinnerSize, Spinner, IStackItemStyles, DefaultPalette, PrimaryButton, TextField,Label } from "@fluentui/react";
import { createPost } from '../../Services/WPService';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './wpPosts.css';

interface WpPostState {
  loading: boolean,
  post: WpPosts,
  title: string,
  content: string,
  accessToken: string;
  error: String
}
const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link'],
    ['clean']
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link'
];

class CreatePost extends React.Component<AuthComponentProps, WpPostState>{
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      post: new WpPosts(),
      title: '',
      content: '',
      accessToken: localStorage.getItem("token") || '',
      error: ''
    };
  }
  createMarkup = (data: any) => ({
    __html: data
  });
  

  private _SaveIntoWP = async (ev: any) => {
    this.setState({
      loading: true
    })
    let post = new WpPostsCreateModel();
    post.title = this.state.title;
    post.content = this.state.content;
    post.slug = this.state.title;
    post.status = "publish";
    await createPost(this.state.accessToken, post).then(res => {
      console.log(res);
      this.setState({
        loading: false
      })
    });
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

    const { loading, error } = this.state;

    return (
      <Stack styles={stackItemStyles}>
        <MetaInfo title={RoutesConfig.CreatePost.metaInfo.title} description={RoutesConfig.CreatePost.metaInfo.title}></MetaInfo>
        {loading && <Spinner size={SpinnerSize.large} />}
        {error && <div className="alert alert-danger" dangerouslySetInnerHTML={this.createMarkup(error)} />}
        <Stack gap="10">
          <TextField label="Title" value={this.state.title} required
            onChange={(event, newvalue) => this.setState({ title: newvalue || '' })} />
          <Label>Content</Label>
          <ReactQuill value={this.state.content} theme="snow" modules={modules}
            formats={formats}
            onChange={(newvalue) => this.setState({ content: newvalue })} />
          <PrimaryButton text="Save" onClick={this._SaveIntoWP} />
        </Stack>
      </Stack>
    );
  }
  // </renderSnippet>
}

export default withAuthProvider(CreatePost);
