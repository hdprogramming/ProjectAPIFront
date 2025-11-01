import { useForm } from "react-hook-form";
import FormInputField from "../components/MainComponents/FormInputField/FormInputField"
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom'; 

 

const LoginWindow = () => {
    const navigate = useNavigate(); // Yönlendirme için hook
    const { Login } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit=async(formdata)=>{   
         
     if (await Login(formdata)) {        
        navigate("/");
        // Başarılı giriş sonrası yönlendirme/state güncelleme yapılabilir
    } else {
        alert("Hata: E-posta veya şifre yanlış.");
    }
    };
    return (
        <>
        <form style={{marginTop:'10vh'}} onSubmit={handleSubmit(onSubmit)}>
            <FormInputField
                labeltext="EMail"
                name="email"
                type="text"
                register={register}
                errors={errors}
                // Kuralları doğrudan JS objesi olarak gönderiyoruz
                validationRules={{
                    required: 'Email adı zorunludur!',
                    minLength: { value: 3, message: 'Minimum 3 karakter olmalı.' }
                }}
            />
            <FormInputField
                labeltext="Şifre"
                name="password"
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