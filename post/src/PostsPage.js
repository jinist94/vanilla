import { request } from "./api.js";
import Linkbutton from "./Linkbutton.js";
import PostList from "./PostList.js";
import { push } from "./router.js";

export default function PostsPage({ $target }) {
  const $page = document.createElement("div");

  const postList = new PostList({
    $target: $page,
    initialState: [],
  });

  new Linkbutton({
    $target: $page,
    initialState: {
      text: "New Post",
      link: "/posts/new",
    },
  });

  this.setState = async () => {
    const posts = await request("/posts");
    postList.setState(posts);
    this.render();
  };

  this.render = async () => {
    $target.appendChild($page);
  };
}
