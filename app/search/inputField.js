import { getList } from "../page";
import { useState,useEffect } from "react";
const InputField = ({search,selected,setSearch,selectedSub}) =>{
    const[List,setList]=useState([]);
    let options = [];
    let opt ;
    const calllist =async() =>{
        if (selected != "Select Category" && selectedSub != "Select Subcategory" ){
            if (selected == "All"){
                if (selectedSub == "All"){
                    const list = await getList(undefined,undefined,search);
                    setList(list);
                }
                else{
                    const list = await getList(undefined,selectedSub,search);
                    setList(list);
                }
            }
            else if (selectedSub == "All"){
                if (selected== "All"){
                    const list = await getList(undefined,undefined,search);
                    setList(list);
                }
                else{
                    const list = await getList(Number(selected),undefined,search);
                    setList(list);
                }
            }
            else{
                const list = await getList(Number(selected),selectedSub,search)
                setList(list)
            }
                
        }
    }
    useEffect(()=>{
        calllist()
    },[search])
    let lists=[];
    List.map((x)=>lists.push(x.description))
    lists?.map((x) =>{
        let str=x.split(" ");
            str?.map((i) =>{
                if(i.startsWith(search)){
                    i.replaceAll(/,*$/g,"");
                    if (!options.includes(i)){
                      options.push(i);
                    }
                }
            }
        )
      }
    )
    options= [...new Set(options)];
    if(search != "SEARCH"){
        opt = options.map((el) => <option key={el}>{el}</option>);
    } 
    return(
        <>
            <input placeholder="Search Keywords.." className="w-fit h-auto p-2 focus:bg-white mx-2  text-slate-500 outline-0 " type="text" value={search} id="first" name="first" list="keywords" multiple onChange={(e) => setSearch(e.target.value)}/>
            <datalist id="keywords">
                {opt}
            </datalist>       
        </>
    )
}
export default InputField;