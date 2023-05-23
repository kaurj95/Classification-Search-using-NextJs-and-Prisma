"use client";
import InputField from "./search/inputField";
import AddFilters from "./search/addFilters";
import { useState } from "react";
import SearchLog from "./search/results";
import CategoryOptions from "./search/categoryOptions";
import SubCategoryOptions from "./search/subCategoryOptions";

const SearchInputs =() =>{
    const[selected,SetSelected]= useState("Select Category");
    const[selectedSub,SetSelectedSub] = useState("Select SubCategory");
    const[search1,SetSearch] = useState('');
    return(
      <>
        <div className="search h-1/3">
          <div>
            <div><h1 className="text-3xl font-medium text-slate-600">Classification Search </h1></div>
          </div>
          <div className="container searchInput px-1 py-3 m-2  ">
            <div className="filter">
              <AddFilters />
            </div>
            <form className= "flex flex-row   px-4 py-5 border-2 rounded-md" onSubmit={(e)=>e.preventDefault()}>
              <fieldset className="w-1/5  h-20 border-2 rounded-md border-slate-400 content-center mx-4">
                <legend className="mx-1 px-2 text-slate-400 justify-between">Category</legend>
                <CategoryOptions id="catg" selectedCat={selected} setSelect={SetSelected}  />
              </fieldset>
              <fieldset className="w-1/5  h-20 border-2 rounded-md border-slate-400 content-center mx-4">
                <legend className="mx-1 px-1 text-slate-400">Sub-Category</legend>
                <SubCategoryOptions  selected={selected} search={search1} selectedSubCat={selectedSub} SetSelectedSub={SetSelectedSub}/>
              </fieldset>
              <fieldset className="w-3/5   h-20 border-2 rounded-md border-slate-400 content-center mx-4">
                <legend className="mx-1 px-1 text-slate-400">Search</legend>
                <InputField search={search1} setSearch={SetSearch} selected={selected} selectedSub={selectedSub} />
              </fieldset>
            </form>
          </div>
          <div className="h-auto">
            <SearchLog  selectedCat={selected} selectedSubc={selectedSub}  search={search1} />
          </div>
        </div>
      </>
    )
}

export default SearchInputs;