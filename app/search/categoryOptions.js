import { useEffect,useState } from "react";
import { getCategory } from "../page"
const CategoryOptions = ({selectedCat,setSelect}) =>{
    const[category,setCategory]=useState([]);
    const callcategory =async() =>{
        const cat = await getCategory()
        setCategory(cat)
    }
    useEffect(()=>{
        callcategory()
    },[])
    let catt=[];
    category.map((x)=>catt.push(x.category))
    return(
        <select className="w-fit h-10 px-5 mx-5 bg-inherit text-slate-500 outline-0 " value={selectedCat} id="CategoryList" onChange={e =>setSelect(e.target.value) } >
            <option >Select Category</option>
            <option>All</option>
            { catt.map((x)=>
                <option >{x}</option>
            )}
        </select>
    )
}
export default CategoryOptions;