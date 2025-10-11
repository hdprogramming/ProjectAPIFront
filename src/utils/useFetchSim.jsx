import { useState,useEffect } from "react";
const useFetchSim=(item)=>{
const [data,setData]=useState(null);
const [errors,setError]=useState(false);
const [isLoading, setIsLoading] = useState(true);
useEffect(() => { 
  const fetchData = async () => {
               try {
                   // *** GERÇEK API UCU BURAYA GELECEK ***
                   // const response = await fetch('/api/experiments');
                   // const data = await response.json();
                   
                   // SIMÜLASYON: 1 saniye bekleyip sahte veriyi yüklüyoruz
                   await new Promise(resolve => setTimeout(resolve, 1000));
                   
                   setData(item);
                   setIsLoading(false);
   
               } catch (err) {
                   setError("Deneyler yüklenirken bir hata oluştu.");
                   setIsLoading(false);
               }
           };
           fetchData();
  }, []);
  return [data,isLoading,errors];
}
export default useFetchSim;