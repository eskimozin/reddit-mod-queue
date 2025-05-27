import {HeaderMain, ContentMain, FeedbackPostsMain, AditionalActions} from "./ComponentsMain.jsx";
import AnimatedComponents from "../ui/animatedComponent/AnimatedComponents.jsx";

import {ContextMain} from "./ContextMain.jsx";
import UseMain from "./UseMain.jsx";
import Footer from "../footer/Footer.jsx";

export default function Main() {
  return (
    <ContextMain>
      <UseMain/>
      <div className="flex align-center justify-center">
        <div className="container mx-3 my-8 lg:my-10 min-h-[90vh] flex justify-between flex-col">
          <main>
            <AnimatedComponents>
              <HeaderMain/>
              <ContentMain/>
            </AnimatedComponents>
            <AditionalActions/>
            <FeedbackPostsMain/>
          </main>
          <Footer/>
        </div>
      </div>
    </ContextMain>
  )
}