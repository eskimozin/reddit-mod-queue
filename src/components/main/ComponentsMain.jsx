import {useContext} from "react";
import {ThemeProvider} from "./ContextMain.jsx";
import Arial from "../ui/arial/Arial.jsx";
import UpdateTime from "../ui/updateTime/UpdateTime.jsx";
import Grid from "../ui/grid/Grid.jsx";
import AnimatedComponents from "../ui/animatedComponent/AnimatedComponents.jsx";
import Card from "../card/Card.jsx";
import Alert from "../ui/alert/Alert.jsx";
import config from "../../config.js";
import ModerateAllPosts from "./ModerateAllPosts.jsx";

const HeaderMain = () => {
  const {vUpdateTime, latestRegister} = useContext(ThemeProvider);
  
  return (
    <hgroup className={"flex items-center gap-4 mb-8 flex-wrap"}>
      <img src={config["ui-infos"]["header-img"]["url"]} alt={config["ui-infos"]["header-img"]["alt"]} className={"rounded-full w-[50px] h-[50px] object-cover"}/>
      <div className={"block"}>
        <h1 className={"text-balance font-bold text-3xl"}>Fila de moderação do <span className={"text-orange-600"}>r<Arial>/</Arial>{config["ui-infos"]["subreddit-name"]}</span></h1>
        <p className={"mb-0 mt-1 text-gray-400 text-balance max-w-[600px]"}>Atualizado há {vUpdateTime ? <UpdateTime time={vUpdateTime}/> : "pouco"}. O último post entrou na fila de moderação há {latestRegister ? <UpdateTime time={latestRegister}/> : "pouco"}. A verificação da fila é feita a cada 5 minutos.</p>
      </div>
    </hgroup>
  )
}

const ContentMain = () => {
  const {isLoading, postsPending, error} = useContext(ThemeProvider);
  
  return (
    <Grid>
      <AnimatedComponents>
        {
          isLoading && !postsPending ? (
            <Card
              title="Carregando..."
              subtitle={"Conectando à API, aguarde"}
              description={"Geralmente isso é rápido mas pode ser que demore um pouco."}
              link={config.links.subreddit}
              btnLabel={"Ir pro subreddit"}
              actions={((e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(config.links.subreddit, "_blank", "noreferrer noopener")
              })}
            />
          ) : postsPending ? postsPending.map((post, index) => {
            const props = {
              title: post["post_title"],
              subtitle: post["post_author_name"],
              description: "",
              img: post["post_img_url"],
              link: post["reddit_link"],
              action: (() => {
                window.open(post["reddit_link"], "_blank", "noreferrer noopener");
              })
            }
            return <Card {...props} key={index}/>
          }) : !error ? (
            <Card
              title={"Não há nada por aqui..."}
              subtitle={"Tudo certo!"}
              description={"Sem posts para a moderação avaliar. Pegue uma bebida e aguarde."}
              btnLabel={"Ir pro subreddit"}
              actions={((e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(config.links.subreddit, "_blank", "noreferrer noopener")
              })}
            />
          ) : (
            <Card
              title={"Ocorreu um erro: " + error}
              subtitle={"Algo não saiu como deveria..."}
              description={""}
              link={config.links.report}
              actions={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(config.links.report, "_blank", "noreferrer noopener")
              }}
              btnLabel={"Reportar"}
            />
          )
        }
      </AnimatedComponents>
    </Grid>
  );
}

const AditionalActions = () => {
  const {postsPending} = useContext(ThemeProvider);
  
  return (
    <>
      {
        postsPending && postsPending.length > 1 && (
          <ModerateAllPosts/>
        )
      }
    </>
  )
}

const FeedbackPostsMain = () => {
  const {postsPending} = useContext(ThemeProvider);
  
  return (
    <>
      {
        postsPending && postsPending.length >= 10 && (
          <AnimatedComponents>
            <Alert>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#94A3B8" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
              </svg>
              <span>Listamos apenas os 10 últimos posts pendentes de moderação.</span>
            </Alert>
          </AnimatedComponents>
        )
      }
      
      <Alert>
        <div className={"flex gap-1 items-center"}>
          <p>Encontrou um erro?</p>{" "}
          <a href={config.links.report} {...config["default-props"]["a"]}>
            <div className={"flex gap-1 items-center"}>
              <span className={"text-white"}>Avisa pra gente!</span>
              <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#FFF">
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
              </svg>
            </div>
          </a>
        </div>
      </Alert>
    </>
  );
}

export {HeaderMain, ContentMain, AditionalActions, FeedbackPostsMain};