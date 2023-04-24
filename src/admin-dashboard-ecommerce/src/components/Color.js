

export const Color = (props) => {
    return (
        <div className="colorContainer">
        <div>{props.colorName}</div>
        <button type="button" onClick={() => props.deleteColor(props.id)}>X</button>
        </div>
    )
}