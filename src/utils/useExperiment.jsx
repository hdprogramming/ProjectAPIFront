import { useEffect, useState } from "react";
import { useAuth,domain} from "../contexts/AuthContext";
import ModifyPage from "../pages/Modify";

export default function useExperiment(id) { // Fonksiyon tanımını düzelttik
    const { api} = useAuth();
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
        const newProjectData = MapExperiment(newExp);
        console.log(newProjectData);
        try {
            let response;
            if (isCreate)
                response = await api.post("/Projects", newProjectData); // POST: ID genellikle dışarıda kalır
            else {
                newProjectData.id = id;
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
            if (response)
                return true;
        }
        catch (error) {
            console.error("Proje silinemedi:", error);
            setError(error);
            return false; // Başarısız olduğunu belirt
        }
        finally {
            setIsLoading(false);
        }
    }
    const GetProjects = async (page=1,length=10) => {
        setIsLoading(true);
        try {
            let response = await api.get(`/Projects/?page=${page}&length=${length}`);
            if (response && response.data) {
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
        finally {
            setIsLoading(false);
        }
    }
    const GetStatusMessages = async () => {
        setIsLoading(true);
        try {
            let response = await api.get(`/ProjectStatusMessages`);
            if (response && response.data) {
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
        finally {
            setIsLoading(false);
        }
    }
    const GetCategories = async () => {
        setIsLoading(true);
        try {
            let response = await api.get(`/ProjectCategories`);
            if (response && response.data) {
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
        finally {
            setIsLoading(false);
        }
    }
    const GetUserData = async (id) => {
        setIsLoading(true);
        try {
            let response = await api.get(`/Users/` + id);
            if (response && response.data) {
                setIsLoading(false);
                return response.data;
            }
            else return null;
        }
        catch (error) {
            console.error("Kullanıcı Bilgileri getirilemedi:", error);
            setError(error);

            return null // Başarısız olduğunu belirt
        }
        finally {
            setIsLoading(false);
        }
    }
    function MapExperiment(newExp) {
        const ExpDTO = {
            "id": newExp.id ? Number(newExp.id) : 0,
            "icon": newExp.icon,
            "title": newExp.title,
            "description": newExp.description,
            "content": newExp.content,
            "isAlive": newExp.isAlive,
            "statusID": Number(newExp.statusID),
            "date": newExp.date,
            "categoryIds": newExp.categoryIds
        }
        return ExpDTO;
    }
    function ValidateFormValue(val)
    {
        if(val==undefined)
            return false;
        else if(val=="")
            return false;
        else if(val.length<2)
            return false;
        else 
            return true;
    }
    function MapUser(newUserData) {
        
        const UserDTO = {
           }
           if(ValidateFormValue(newUserData.userName))
           UserDTO.userName=newUserData.userName;
         if(ValidateFormValue(newUserData.bio))
           UserDTO.bio=newUserData.bio;
         if(ValidateFormValue(newUserData.password))
           UserDTO.password=newUserData.password;
          if(ValidateFormValue(newUserData.ProfileImageUrl))
           UserDTO.ProfileImageUrl=newUserData.ProfileImageUrl;
        
        return UserDTO;
    }
    async function ModifyContent(id, content) {
        setIsLoading(true);
        setError(null);
        const newProjectData = { id: id, content: content };
        console.log(newProjectData);
        try {
            let response = await api.patch(`/projects/${id}`, newProjectData);
            if(response)
            return true; // Başarılı olduğunu belirt

        } catch (error) {
            console.error("Proje kaydedilemedi:", error);
            setError(error);
            return false; // Başarısız olduğunu belirt
        } finally {
            setIsLoading(false);
        }
    }
   /**
 * Resmi ve ID'yi multipart/form-data olarak sunucuya yükler.
 * @param {string} id - Resimle ilişkilendirilecek ID
 * @param {File} image - Kullanıcının seçtiği 'File' nesnesi
 */
async function UploadImage(name, image,projectid) {
    setIsLoading(true);
    setError(null);

    // 1. JSON nesnesi yerine bir FormData nesnesi oluşturun
    const formData = new FormData();

    // 2. Göndermek istediğiniz verileri 'append' (ekle) metoduyla ekleyin.
    // Sunucu tarafında (backend) bu 'key' (anahtar) isimlerini bekliyor olacaksınız.
    formData.append('name', name);
    formData.append('image', image); // 'image' değişkeni File nesnesi olmalı
    if(projectid)
    formData.append('ProjectID',projectid);
    console.log("Dosya yüklenmek üzere FormData'ya eklendi...");
   
    try {
        // 3. 'api.post' fonksiyonunun ikinci parametresi olarak JSON yerine 'formData'yı verin.
        let response = await api.post(`/Uploads/Image`, formData);
        
        if (response)
        {
            return domain+response.data.url // Başarılı olduğunu belirt
        }

    } catch (error) {
        console.error("Dosya yüklenemedi:", error);
        setError(error);
        return ""; // Başarısız olduğunu belirt
    } finally {
        setIsLoading(false);
    }
}
async function GetFiles()
{
     setIsLoading(true);
    setError(null);
    try {
        // 3. 'api.post' fonksiyonunun ikinci parametresi olarak JSON yerine 'formData'yı verin.
        let response = await api.get(`/Uploads/MyFiles`);
        
        if (response)
        {           
            return response.data // Başarılı olduğunu belirt
        }

    } catch (error) {
        console.error("Dosyalar getirilemedi...", error);
        setError(error);
        return ""; // Başarısız olduğunu belirt
    } finally {
        setIsLoading(false);
    }
}
async function RenameFile(id,name)
{
       setIsLoading(true);
    setError(null);
    try {
        // 3. 'api.post' fonksiyonunun ikinci parametresi olarak JSON yerine 'formData'yı verin.
        let response = await api.put(`/Uploads/Update/${id}`,{name:name});
        
        if (response)
        {           
            return response.status // Başarılı olduğunu belirt
        }

    } catch (error) {
        console.error("Dosya silinemedi...", error);
        setError(error);
        return ""; // Başarısız olduğunu belirt
    } finally {
        setIsLoading(false);
    }
}
async function DeleteFile(id)
{
       setIsLoading(true);
    setError(null);
    try {
        // 3. 'api.post' fonksiyonunun ikinci parametresi olarak JSON yerine 'formData'yı verin.
        let response = await api.delete(`/Uploads/Delete/${id}`);
        
        if (response)
        {           
            return response.status // Başarılı olduğunu belirt
        }

    } catch (error) {
        console.error("Dosya silinemedi...", error);
        setError(error);
        return ""; // Başarısız olduğunu belirt
    } finally {
        setIsLoading(false);
    }
}
async function UserUpdate(userdata,UserID)
{

    if(userdata)
    {
            setIsLoading(true);
    setError(null);
        try {
            let response=await api.patch(`/Users/TargetUserID`,MapUser(userdata),
        { 
    params: {
      TargetUserID: UserID 
    }
  });
           if(response)
           {
            return response.status;
           }
          
        } catch (error) {
            console.log(error);
            setError(error);
        }
        finally{
            setIsLoading(false);
        }
    }
}
    // Çıktı isimlerini mantıklı hale getirdik
    return {
        api,
        experiment,
        isLoading,
        error,
        // Dışarıya sadece kaydetme fonksiyonunu veriyoruz
        GetProjects,
        GetStatusMessages,
        GetCategories,
        GetUserData,
        setExperiment,
        saveProject,
        deleteProject,
        ModifyContent,
        MapExperiment,
        UploadImage,
        GetFiles,
        RenameFile,
        DeleteFile,
        UserUpdate
    };
}