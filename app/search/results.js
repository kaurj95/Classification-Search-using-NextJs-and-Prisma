import { getResult } from "../page";
import { useState, useEffect } from "react";
const SearchLog= ({selectedCat,selectedSubc,search}) => {
    const[Result,setResult]=useState([]);
    const[next,setNext]=useState('hidden');
    const[prev,setPrev]=useState('hidden');
    const[skip,setSkip] = useState(0);
    let limit=20;
    let options="";
    let cat; 
    let subcat; 
    const callresult =async() =>{
        if (selectedCat != "Select Category" && selectedCat != "Select Subcategory"  ){ 
            if (selectedCat == "All"){
                if (selectedSubc== "All"){
                    const [results,next,prev] = await getResult(undefined,undefined,search,skip,limit)
                    setResult(results)
                    setNext(next)
                    setPrev(prev)
                }
                else{
                    const [results,next,prev] = await getResult(undefined,selectedSubc,search,skip,limit)
                    setResult(results)
                    setNext(next)
                    setPrev(prev)
                }
            }
            else if (selectedSubc == "All"){
                if (selectedCat== "All"){
                    const [results,next,prev] = await getResult(undefined,undefined,search,skip,limit)
                    setResult(results)
                    setNext(next)
                    setPrev(prev)
                }
                else{
                    const [results,next,prev] = await getResult(Number(selectedCat),undefined,search,skip,limit)
                    setResult(results)
                    setNext(next)
                    setPrev(prev)
                }
            }
            else{
                const [results,next,prev] = await getResult(Number(selectedCat),selectedSubc,search,skip,limit)
                setResult(results)
                setNext(next)
                setPrev(prev)
            }
                
            }
       
         }
        useEffect(()=>{
            callresult()
            console.log(Result.length)
        
        },[search,selectedCat,selectedSubc,skip])
        console.log('Type List',Array.isArray(Result),Result)
        let Results=[];
        Result.map((x)=>Results.push(x))
        const  HandleNext=()=>{
            setSkip(skip+20) 
        }
        const HandlePrevious = () => {
            setSkip(skip-20); 
        }

        if (Results.length == 0){
            options = `<div class='block mx-72 px-52 content-center'> No Records... Start Searching....</div>`
        }
        Results?.map((x)=>{
            if(x.category== cat){
                options+=``
            }
            else{
                options+=  `<div><div class="block mx-2 font-medium " id="_category"><b class="mx-2  cursor-pointer  " id="icon" >-</b>`+ x.category +`</div>`; 
            }
            if (x.subcategory == subcat){
                options+=``
            }
            else{
                options+= `<div><div class=" block mx-6 font-medium " id="_subcategory"><b class="mx-2 " id="icon">-</b>`+ x.subcategory +`</div>` ;
            }
        
            var regEx = new RegExp(search, "ig");
            let desc = x.description.replace(regEx, `<span class="bg-slate-200">`+ search +`</span>`);
            options+= `<div><div class="mx-12 my-2" id="_id"><span class="font-medium">`+ x.id +
                 `</span><div class="mx-8 my-2" id="_description">`+desc +`</div></div></div></div></div>`
            cat = x.category;
            subcat=x.subcategory
        })

   return(
      <>  
        <div  className="text-slate-500 h-full" id="outer" dangerouslySetInnerHTML={{ __html:options}} ></div>
        <div className='flex flex-row my-8' >
        <button id="prev" className={prev +' w-32 h-12 bg-slate-300 mx-4 rounded-md hover:bg-slate-400 active:{bg-slate-500 text-white}'} onClick={HandlePrevious}>Previse Page</button>
        <button id="next" className={next+' w-32 h-12 bg-slate-300 mx-4 rounded-md hover:bg-slate-400 active:{bg-slate-500 text-white}'} onClick={HandleNext}>Next Page</button> 
        </div>
      </> 
    )
}
export default SearchLog;  