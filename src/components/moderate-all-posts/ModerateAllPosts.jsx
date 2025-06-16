import {ModerateAllPostsContext} from "./ModerateAllPostsContext.jsx";
import UseModerateAllPosts from "./UseModerateAllPosts.jsx";
import ModerateAllPostsContent from "./ModerateAllPostsContent.jsx";

export default function ModerateAllPosts() {
  return (
    <ModerateAllPostsContext>
      <UseModerateAllPosts/>
      <ModerateAllPostsContent/>
    </ModerateAllPostsContext>
  )
}
