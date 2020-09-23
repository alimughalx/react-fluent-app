import WPAPI from 'wpapi';
import { WpPosts, WpPostsCreateModel } from '../Modals/WpPost';
import { WpPostCommentsModel } from '../Modals/WpComment';
import { config } from '../Helpers/Config';
import { WpUserDetails } from '../Modals/WpUser';

//<wpApIServiceSnippet>
function getAuthenticatedClient(accessToken: string) {
  // Initialize Wordpress client
  const wp = new WPAPI({ endpoint: config.WpSiteUrl });
  wp.setHeaders({ "Authorization": "Bearer " + accessToken })
  return wp;
}
// </wpApIServiceSnippet>

// <getUserDetailsSnippet>
export async function getUserDetails(accessToken: string): Promise<WpUserDetails> {
  const client = getAuthenticatedClient(accessToken);
  var user: WpUserDetails = new WpUserDetails();
  await client.url(config.WpSiteUrl + "/wp/v2/users/me").then(function (data) {
    user.id = data ? data.id : 0;
    user.name = data ? data.name : "";
    return user;
  }).catch(function (err) {
    throw err;
  });

  return user;
}
// <getUserDetailsSnippet>


// <getWpPostSnippet>
export async function getWPPost(accessToken: string): Promise<WpPosts[]> {
  const client = getAuthenticatedClient(accessToken);
  var response = await client.posts();
  return response;
}
// </getWpPostSnippet>

// <getWpPostSnippet>
export async function getWPSinglePost(accessToken: string, postId: number): Promise<WpPosts> {
  const client = getAuthenticatedClient(accessToken);
  var response = await client.posts().id(postId);
  return response;
}
// </getWpPostSnippet>

// <getWpPostSnippet>
export async function getWPSinglePostComments(accessToken: string, postId: number): Promise<WpPostCommentsModel[]> {
  const client = getAuthenticatedClient(accessToken);
  var response = await client.comments().param("post=" + postId);
  return response;
}
// </getWpPostSnippet>

// <createEventSnippet>
export async function createPost(accessToken: string, newPost: WpPostsCreateModel): Promise<WpPosts> {
  const client = getAuthenticatedClient(accessToken);
  // POST /me/events
  // JSON representation of the new event is sent in the
  // request body
  return await client.posts().create(newPost);
}
// </createEventSnippet>
