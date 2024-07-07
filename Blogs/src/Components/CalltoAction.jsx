import { Button } from "flowbite-react"


function CalltoAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-400 items-center justify-center rounded-tl-3xl rounded-br-lg ">
      <div className="flex-1 justify-center flex-col flex gap-4 ">
        <h2 className="text-2xl  ">King Of all thing , yes i am javascript...</h2>
        <p className="text-sm text-gray-400">
          check out these resources
        </p>
        <Button className="rounded-tl-xl rounded-bl-none " gradientDuoTone={'purpleToBlue'} >He he he</Button>

      </div>
      <div className="p-7 flex-1 ">
        <img src="https://www.freecodecamp.org/news/content/images/2020/04/jsposter.jpg"  />
      </div>
    </div>
  )
}

export default CalltoAction