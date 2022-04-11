import { request } from "./api.js";
import { getItem, removeItem, setItem } from "./storage.js";
import Editor from "./Editor.js";
import { push } from "./router.js";
import Linkbutton from "./Linkbutton.js";

export default function PostEditPage({ $target, initialState }) {
  const $page = document.createElement("div");

  this.state = initialState;

  let postLocalSaveKey = `temp-post-${this.state.postId}`;

  const post = getItem(postLocalSaveKey, {
    title: "",
    content: "",
  });

  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: post,
    onEditing: (post) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        setItem(postLocalSaveKey, {
          ...post,
          tempSaveDate: new Date(),
        });

        const isNew = this.state.postId === "new";
        if (isNew) {
          const createdPost = await request("/posts", { method: "POST", body: JSON.stringify(post) });
          history.replaceState(null, null, `/posts/${createdPost.id}`);
          removeItem(postLocalSaveKey);

          this.setState({
            // 생략 시 무한 증식 버그 생김
            postId: createdPost.id,
          });
        } else {
          await request(`/posts/${post.id}`, {
            method: "PUT",
            body: JSON.stringify(post),
          });
          removeItem(postLocalSaveKey);
        }
      }, 500);
    },
  });

  this.setState = async (nextState) => {
    console.log(this.state);

    if (this.state.postId !== nextState.postId) {
      postLocalSaveKey = `temp-post-${nextState.postId}`;
      this.state = nextState;

      if (this.state.postId === "new") {
        const post = getItem(postLocalSaveKey, {
          title: "",
          content: "",
        });
        this.render();
        editor.setState(post);
      } else {
        await fetchPosts();
      }

      return;
    }
    this.state = nextState;
    this.render();
    editor.setState(this.state.post || { title: "", content: "" });
  };

  this.render = () => {
    $target.appendChild($page);
  };

  const fetchPosts = async () => {
    const { postId } = this.state;
    if (postId !== "new") {
      const post = await request(`/posts/${postId}`);

      const tempPost = getItem(postLocalSaveKey, {
        title: "",
        content: "",
      });
      if (tempPost.tempSaveDate && tempPost.tempSaveDate > post.updated_at) {
        if (confirm("저장되지 않은 임시 데이터가 있습니다. 불러올까요?")) {
          this.setState({
            ...this.state,
            post: tempPost,
          });
          return;
        }
      }

      this.setState({
        ...this.state,
        post,
      });
    } else {
    }
  };

  new Linkbutton({
    $target: $page,
    initialState: {
      text: "목록으로 이동",
      link: "/",
    },
  });
}

// 새로운 페이지를 생성하고 해당 포스트의 글이 생성이 되고
// 해당페이지 내에서 이후 작업은 생성이 아니라 수정으로 돌아가야함.
