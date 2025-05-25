import AnimatedComponents from "../ui/animatedComponent/AnimatedComponents.jsx";

export default function Loading() {
  return (
    <div className="flex align-center justify-center">
      <div className="container mx-3 my-8 lg:my-10 min-h-[90vh] flex justify-between flex-col">
        <AnimatedComponents>
          <div>Carregando...</div>
        </AnimatedComponents>
      </div>
    </div>
  )
}