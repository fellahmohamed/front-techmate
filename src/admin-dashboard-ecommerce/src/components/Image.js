export const Image = (props) => {

  return (
    <div className="flex flex-col gap-1">
      {props.imageUrl !== "" ? (
        <>

          <div>{props.imageName} </div>
          <div className="flex gap-1">
            <button type="button" onClick={() => props.deleteImage(props.id)} className="w-1/2">X</button>
            <button className="w-1/2 "><a href={props.imageUrl} target="_blank" className="text-black text-center">View</a></button>
          </div>
        </>
      ) : (
        <>
          <div>{props.imageName} </div>
          <button type="button" className="w-1/2" onClick={() => props.deleteImage(props.id)}>X</button>

        </>
      )
      }
    </div>
  )
}