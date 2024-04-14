import React, { useEffect, useState } from 'react'


function User() {
const [data,setData] = useState();
useEffect(
    
    fetch('https://api.github.com/users/prakharyadav27').then((res)=>(res.json())).then((data)=>{
        setData(data);
    }),[])

    return (
    <div>Github Followers :  {data}</div>
  )
}

export default User