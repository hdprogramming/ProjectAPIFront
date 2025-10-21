import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function useExperiment(id) { // Fonksiyon tanımını düzelttik
    const { api } = useAuth();
    // 'experiment' yerine 'project' kullanmak daha okunaklı olabilir.
    const [experiment, setExperiment] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Başlangıçta true olmalı
     
    // 1. VERİ ÇEKME İŞLEMİNİ useEffect İÇİNDE OTOMATİK BAŞLAT
    useEffect(() => {
        const fetchProject = async () => {
            setIsLoading(true);
            setError(null); // Yeni fetch öncesi hatayı temizle
            try {
                const response = await api.get(`/projects/${id}`);
                setExperiment(response.data);
            } catch (error) {
                console.error("Proje yüklenemedi:", error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) { // id var ise veriyi çek
            fetchProject();
        } else { // id yoksa (yeni proje oluşturuluyorsa)
            setIsLoading(false);
            setExperiment({}); // Boş bir obje ile başlat
        }

    }, [api, id]);

    // 2. KAYDETME/GÜNCELLEME FONKSİYONU
    const saveProject = async (newExp, isCreate = false) => {
        setIsLoading(true);
        setError(null);
        const newProjectData=MapExperiment(newExp);
        console.log(newProjectData);
        try {
            let response;
            if (isCreate)
                response = await api.post("/Projects", newProjectData); // POST: ID genellikle dışarıda kalır
            else
            {
                newProjectData.id=id;
                response = await api.put(`/projects/${id}`, newProjectData);
            }                
              
            // API'den dönen veriyi (veya gönderdiğimiz veriyi) state'e set et
            setExperiment(response.data || newProjectData);
            return true; // Başarılı olduğunu belirt

        } catch (error) {
            console.error("Proje kaydedilemedi:", error);
            setError(error);
            return false; // Başarısız olduğunu belirt
        } finally {
            setIsLoading(false);
        }
    };
    const deleteProject = async () => {
        setIsLoading(true);
        setError(null);

        try {
         let response = await api.delete(`/projects/${id}`);
         if(response)
            return true;
        }
        catch (error) {
             console.error("Proje silinemedi:", error);
            setError(error);
            return false; // Başarısız olduğunu belirt
        }
        finally{
            setIsLoading(false);
        }
    }
    const GetProjects=async()=>{
      setIsLoading(true);
       try {
         let response = await api.get(`/Projects`);
         if(response&&response.data)
            {
                setIsLoading(false);
                return response.data;              
            }
            else return [];
        }
        catch (error) {
             console.error("Projeler getirilemedi:", error);
            setError(error);
            return [] // Başarısız olduğunu belirt
        }
        finally{
            setIsLoading(false);
        }
    }
    const GetStatusMessages=async()=>{
      setIsLoading(true);
       try {
         let response = await api.get(`/ProjectStatusMessages`);
         if(response&&response.data)
            {
                setIsLoading(false);
                return response.data;              
            }
            else return null;
        }
        catch (error) {
             console.error("Proje Durum Bilgileri getirilemedi:", error);
            setError(error);
            return null // Başarısız olduğunu belirt
        }
        finally{
            setIsLoading(false);
        }
    }
    const GetCategories=async()=>{
      setIsLoading(true);
       try {
         let response = await api.get(`/ProjectCategories`);
         if(response&&response.data)
            {
                setIsLoading(false);
                return response.data;              
            }
            else return null;
        }
        catch (error) {
             console.error("Proje Kategori Bilgileri getirilemedi:", error);
            setError(error);
            return null // Başarısız olduğunu belirt
        }
        finally{
            setIsLoading(false);
        }
    }
    function MapExperiment(newExp)
    {
         const ExpDTO={
       "id": newExp.id?Number(newExp.id):0,
  "icon": newExp.icon,
  "title": newExp.title,
  "description": newExp.description,
  "content": newExp.content,
  "isAlive": newExp.isAlive,
  "statusID": Number(newExp.statusID),
  "date": newExp.date,
  "categoryIds":newExp.categoryIds
    }
    return ExpDTO;
    }
    // Çıktı isimlerini mantıklı hale getirdik
    return {
        experiment,
        isLoading,
        error,
        // Dışarıya sadece kaydetme fonksiyonunu veriyoruz
        GetProjects,
        GetStatusMessages,
        GetCategories,
        setExperiment,
        saveProject,
        deleteProject,
        MapExperiment
    };
}