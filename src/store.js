// import { createStore, action, thunk, computed } from "easy-peasy";
// import api from "./api/posts";

// export default createStore({
//   posts: [],
//   setposts: action((state, payload) => {
//     state.posts = payload;
//   }),
//   title: "",
//   settitle: action((state, payload) => {
//     state.title = payload;
//   }),
//   newpost: "",
//   setnewpost: action((state, payload) => {
//     state.newpost = payload;
//   }),
//   titleedit: "",
//   settitleedit: action((state, payload) => {
//     state.titleedit = payload;
//   }),
//   newpostedit: "",
//   setnewpostedit: action((state, payload) => {
//     state.newpostedit = payload;
//   }),
//   search: "",
//   setsearch: action((state, payload) => {
//     state.search = payload;
//   }),
//   searchresult: "",
//   setsearchresult: action((state, payload) => {
//     state.searchresult = payload;
//   }),
//   postCount: computed((state) => state.posts.length),
//   getPostById: computed((state) => {
//     return (id) => state.posts.find((post) => post.id.toString() === id);
//   }),
//   savePost: thunk(async (actions, postObj, helpers) => {
//     const { posts } = helpers.getState();
//     try {
//       const response = await api.post("/posts", postObj);
//       actions.setposts([...posts, response.data]);
//       actions.settitle("");
//       actions.setnewpost("");
//     } catch (error) {
//       console.log(`Error: ${error.message}`);
//     }
//   }),
//   deletePosts: thunk(async (actions, id, helpers) => {
//     const { posts } = helpers.getState();
//     try {
//       await api.delete(`/posts/${id}`);
//       actions.setposts(posts.filter((post) => post.id !== id));
//     } catch (error) {
//       console.log(`Error: ${error.message}`);
//     }
//   }),
//   editPost: thunk(async (actions, postObj, helpers) => {
//     const { posts } = helpers.getState();
//     const { id } = postObj;
//     try {
//       const response = await api.put(`/posts/${id}`, postObj);
//       actions.setposts(
//         posts.map((post) => (post.id === id ? { ...response.data } : post))
//       );
//       actions.settitleedit("");
//       actions.setnewpostedit("");
//     } catch (error) {
//       console.log(`Error: ${error.message}`);
//     }
//   })
// });
