import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import useExperiment from '../utils/useExperiment';
const FetchUtilsContext = createContext({

});
export const FetchUtilsProvider=({children})=>{
const [Categories,setCategories]=useState([]);
const [StatusMessages,setStatusMessages]=useState([]);
const {GetCategories,GetStatusMessages}=useExperiment();
useEffect(()=>{
     const GetCategoriesFetch=async()=>{
      let ResponseCategories=await GetCategories();
      if(ResponseCategories)
        setCategories(ResponseCategories);
      let ResponseStatusMessages = await GetStatusMessages();
      if(ResponseStatusMessages)
        setStatusMessages(ResponseStatusMessages);
     }
     GetCategoriesFetch();
},[])
const getCategoryNameById = (id) => {
    const category = Categories.find(cat => cat.id === id);
    return category ? category.name : undefined;
  };

  
  const getStatusMessageNameById = (id) => {
    const message = StatusMessages.find(msg => msg.id === id);
    return message ? message.name : undefined;
  };
 const value = {
    Categories,
    StatusMessages,
    getCategoryNameById,
    getStatusMessageNameById
  };
    return(
     <FetchUtilsContext value={value}>
        {children}
     </FetchUtilsContext>
    )
}
export const useFetchUtils = () => {
  return useContext(FetchUtilsContext);
};
export default FetchUtilsContext;