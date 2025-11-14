// ProductDetail.js

import { useEffect, useState } from 'react';
import StatusRenderer from '../utils/StatusRenderer';
import { useAuth } from "../contexts/AuthContext";
import useExperiment from "../utils/useExperiment";
import FileView from '../components/FileView/fileview'
import FormInputField from '../components/MainComponents/FormInputField/FormInputField';
import { useForm} from 'react-hook-form';
import ImageUploader from '../components/ImageUploader/ImageUploader';
const Profile = () => {

    const [UserData, setUserData] = useState();
    // 1. Veri ve Yükleme Durumları İçin State Tanımlama
    const { UserID, Logoff } = useAuth();
    const [lockSubmit, setLockSubmit] = useState(false);
    const { GetUserData, UserUpdate, isLoading, errors } = useExperiment();
    const [isPasswordUpdate,setPasswordUpdate]=useState(false);
    const [selectedFileID,setSelectedFile]=useState();
    const [selectedFileName,setSelectedFileName]=useState("Seçilmemiş");
    function EmailMasker(emailtext) {
        return "**" + String(emailtext).slice(2);
    }
    async function FetchUserData(id) {
        const response = await GetUserData(id);
        if (response)
            setUserData(response);
        else {
            Logoff();
        }
    }

    useEffect(() => {

        FetchUserData(UserID);
    }, []);
    const statusContent = (
        <StatusRenderer
            isLoading={isLoading}
            error={errors}
            loadingMessage="Profil Yükleniyor..." // Mesajı dinamik olarak veriyoruz
        // errorMessage'i opsiyonel bırakabiliriz.
        />
    );
    const {
        register,
        handleSubmit,
        formState: { errors: err },
        trigger,
        control,
        setValue,
    } = useForm({
        defaultValues: {
            userName: undefined,
            profileImageUrl:undefined,
            password:undefined,
            bio:undefined
        }

    });
    const UpdateUser = async (data) => {
        
        if (UserID) {
            await UserUpdate(data, UserID);
            FetchUserData(UserID);
        }
    }
    const setSelectFile=(file)=>{
        setValue('ProfileImageUrl', file.src, {
                                shouldValidate: true, // Opsiyonel: Değer değişince validasyon çalışsın
                                shouldDirty: true   // Opsiyonel: Formun "değiştiğini" (kirli) işaretle
                            }); 
        setSelectedFile(file.id);
        setSelectedFileName(file.name);
        console.log(file);
    }
    // 2. Eğer yükleniyor veya hata varsa, sadece durumu göster
    if (isLoading || errors) {
        return statusContent;
    }
    // 4. Veri Yüklendikten Sonra İçeriği Gösterme
    return (
        <div style={{ display: 'flex', flexDirection: "column", gap: '5px' }}>
            <div style={{ padding: '20px', border: '1px solid #00ff66' }}>

                <h1>Profiliniz</h1>
                <p><img style={{ width: '150px', height: '150px', borderRadius: '150px' }} src={UserData.profileImageUrl ? UserData.profileImageUrl : "#"} alt="" /></p>
                <p><strong>Adınız:</strong> {UserData.userName}</p>
                <p><strong>E-posta:</strong> {EmailMasker(UserData.email)}</p>
                <p><strong>Hakkında:</strong> {UserData.bio ? UserData.bio : "yok"}</p>

            </div>
            <div style={{ border: '1px solid #00ff66' }}>
                <h3 style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>Kullanıcı Bilgilerini Güncelle</h3>
                <form onSubmit={handleSubmit(UpdateUser)}>
                    <FormInputField
                        labeltext="Kullanıcı Adı"
                        register={register}
                        type="text"
                        name="userName"
                        errors={err}
                    >
                    </FormInputField>
                    <button onClick={(e)=>
                        {
                            e.preventDefault();
                            setPasswordUpdate(!isPasswordUpdate);
                        }}>Şifre Değiştir </button>
                    {isPasswordUpdate&&<FormInputField
                        labeltext="Şifreniz"
                        register={register}
                        type="text"
                        name="password"
                        errors={err}
                        validationRules={{
                           minLength: { value: 8, message: 'Minimum 8 karakter olmalı.' }
                        }}
                    ></FormInputField>
                    }
                    
                    <FormInputField
                        labeltext="Bio"
                        register={register}
                        type="textarea"
                        name="bio"
                        errors={err}
                    >
                    </FormInputField>
                    <input type="hidden" name="ProfileImageUrl" ></input>

                    <label>Profil Resminiz:{selectedFileName}</label>
                    <ImageUploader
                        // ImageUploader URL'yi ürettiğinde bu fonksiyonu çağıracak
                        onSuccess={async (generatedUrl) => {
                            setLockSubmit(true);
                            setValue('ProfileImageUrl', await generatedUrl, {
                                shouldValidate: true, // Opsiyonel: Değer değişince validasyon çalışsın
                                shouldDirty: true   // Opsiyonel: Formun "değiştiğini" (kirli) işaretle
                            }); 
                            setLockSubmit(false);
                        }}
                    />

                    <input disabled={lockSubmit} type="submit" value={lockSubmit ? "Lütfen Bekleyiniz" : "Güncelle"}></input>
                </form>


            </div>
            <div style={{ border: '1px solid #00ff66' }}>
                <FileView selectedFileID={selectedFileID} setSelectFile={setSelectFile}>

                </FileView>
            </div>
        </div>
    );
};


export default Profile;