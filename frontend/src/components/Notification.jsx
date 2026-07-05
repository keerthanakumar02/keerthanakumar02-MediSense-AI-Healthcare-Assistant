function Notification(){

return(

<div
style={{
position:"relative",
cursor:"pointer"
}}
>

🔔

<span
style={{
position:"absolute",
top:-5,
right:-8,
background:"red",
color:"white",
borderRadius:"50%",
padding:"3px 7px",
fontSize:"12px"
}}
>

3

</span>

</div>

);

}

export default Notification;