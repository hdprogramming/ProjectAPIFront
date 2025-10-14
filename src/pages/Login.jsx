import { useForm } from "react-hook-form";
import FormInputField from "../components/MainComponents/FormInputField/FormInputField"
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom'; 
const PassControl = (formdata) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (formdata.email == "deneme@com" && formdata.pass == "1234") {
                // Başarılıysa Promise'ı true ile çözümle
                resolve(true); 
            } else {
                // Başarısızsa Promise'ı false ile çözümle
                resolve(false); 
            }
        }, 800); // 800 milisaniye gecikme
    });
};
const LoginWindow = () => {
    const navigate = useNavigate(); // Yönlendirme için hook
    const { isLogin,Login,Logoff } = useAuth();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        trigger,
    } = useForm();
    const onSubmit=(formdata)=>{   
         
     if (Login(formdata)) {        
        navigate("/");
        // Başarılı giriş sonrası yönlendirme/state güncelleme yapılabilir
    } else {
        alert("Hata: E-posta veya şifre yanlış.");
    }
    };
    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormInputField
                labeltext="EMail"
                name="email"
                type="text"
                register={register}
                errors={errors}
                // Kuralları doğrudan JS objesi olarak gönderiyoruz
                validationRules={{
                    required: 'Email adı zorunludur!',
                    minLength: { value: 10, message: 'Minimum 10 karakter olmalı.' }
                }}
            />
            <FormInputField
                labeltext="Şifre"
                name="pass"
                type="text"
                register={register}
                errors={errors}
                // Kuralları doğrudan JS objesi olarak gönderiyoruz
                validationRules={{
                    required: 'Şifre girmek zorunludur!',
                    minLength: { value: 4, message: 'Minimum 4 karakter olmalı.' }
                }}
            />
            <button>Giriş Yap</button>
        </form></>
    )
}
export default LoginWindow;