export const Image = (props) => {
    return (
        <div className="imageContainer">
      <div>{props.imageName} </div>
      <button onClick={() => props.deleteImage(props.id)}>X</button>
      </div>
      )
}