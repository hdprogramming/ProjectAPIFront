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
    const saveProject = async (newProjectData, isCreate = false) => {
        setIsLoading(true);
        setError(null);

        try {
            let response;
            if (isCreate)
                response = await api.post("/projects", newProjectData); // POST: ID genellikle dışarıda kalır
            else
                response = await api.put(`/projects/${id}`, newProjectData); // PUT: Güncel veriyi kullan
              
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
         response = await api.delete(`/projects/${id}`);
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

    // Çıktı isimlerini mantıklı hale getirdik
    return {
        project: experiment,
        isLoading,
        error,
        // Dışarıya sadece kaydetme fonksiyonunu veriyoruz
        saveProject,
        deleteProject,
    };
}