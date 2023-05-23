'use server';
import prisma from '@/lib/prisma';
import SearchInputs from './searchInputs';

const page = async() => {
  return(
    <div className="flex flex-col text-black w-full h-auto ">
      <SearchInputs/> 
    </div>
  )
} 
export async function getCategory(){
  const result = await prisma.part774.findMany({
    select:{
      category:true,
    },distinct:['category'],
  })
  return (result);
}

export const getSubCategory = async(x) =>{
  const result = await prisma.part774.findMany({
    where:{
      category:x,
    },
    select:{
      subcategory:true,
    },distinct:['subcategory'],
  })
  return result
}
 
export const getList = async(cat,subcat,search) =>{
  const result = await prisma.part774.findMany({
    where:{
      category:cat,
      subcategory:subcat,
      description:{
        contains:search
      }
    },
    select:{
      description:true
    },
  })
  return result
}  
export async function getResult(cat,subcat,search,skip,limit){
  const result = await prisma.part774.findMany({
    where:{
      category:cat,
      subcategory:subcat,
      description:{
        contains:search
      }
    }, 
    select:{
      category:true,
      subcategory:true,
      id:true,
      description:true,
    },
    skip:skip,
    take:limit,
  })
  let prev,next;
  if(skip>0){
    if (result.length<20){
      prev='block';
      next='hidden';
    }else{
      prev='block';
      next='block';
    }
    
  }
  else if(skip==0){
    
    if (result.length<20){
      prev='hidden';
      next='hidden';
    }else{
      prev='hidden';
      next='block';
    }
  }
  else{
    prev='hidden';
      next='hidden';
  }
  return([result,next,prev])
}
export default page;