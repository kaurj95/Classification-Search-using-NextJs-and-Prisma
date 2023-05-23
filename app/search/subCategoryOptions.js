import { getSubCategory } from "../page";
import { useState,useEffect } from "react";
const SubCategoryOptions = ({selected,SetSelectedSub}) =>{
    let subcat=[];  
    const[subcategory,setSubCategory]=useState([]);
    const callsubcategory =async() =>{
        if (selected != "Select Category"){
            if (selected == "All"){
                const subcats = await getSubCategory(undefined)
                setSubCategory(subcats)
            }
            else{
                const subcats = await getSubCategory(Number(selected))
                setSubCategory(subcats)
                console.log(selected)
            }
                
        }
        else{
            setSubCategory([])
        }
        
    }
    useEffect(()=>{
        callsubcategory()
    },[selected])
    subcategory.map((x)=>subcat.push(x.subcategory))
    return(
        <select className="w-fit h-10 px-5 mx-5 bg-inherit text-slate-500 outline-0" onChange={event =>SetSelectedSub(event.target.value)}>
            <option>Select Subcategory</option>
            <option>All</option>
                {subcat?.map((x)=>
                    <option key={x}>{x}</option>
                )}
        </select>
    )
}
export default SubCategoryOptions;