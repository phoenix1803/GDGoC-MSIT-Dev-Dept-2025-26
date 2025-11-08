function Button ({type,varient,value,onClick}){
    return <button type={type} onClick ={onClick} className={`btn ${varient}`}>{value}</button>
}
export default Button;