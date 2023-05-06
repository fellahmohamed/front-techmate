

export const Color = (props) => {
    return (
        <div className="flex flex-col gap-1 mt-1" >
        <div className="text-center">{props.colorName}</div>
        <button className="p-3 text-center bg-blueColor text-white " type="button"  onClick={() => props.deleteColor(props.id)}>X</button>
        </div>
    )
}