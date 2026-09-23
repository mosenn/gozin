"use client"
import { useForm } from "react-hook-form"
import { LoginSchema } from "../schemas/loginSchema"
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormValues } from "../types/auth.types";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useLoginMutation } from "../services/LoginAction";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


const LoginForm = () => {
   const router = useRouter();
  const [login] = useLoginMutation();
   const {register,handleSubmit,reset,formState}=useForm<LoginFormValues>({
          resolver:zodResolver(LoginSchema)
      })

    async function onSubmit(formData:LoginFormValues){
     
       try {
      const result = await login(formData).unwrap();
    
      

      toast.success(result.message);

      router.push("/");
    } catch (error) {
      const message =
        error &&
        typeof error === "object" &&
        "data" in error &&
        error.data &&
        typeof error.data === "object" &&
        "message" in error.data
          ? String(error.data.message)
          : "ورود ناموفق بود";

      toast.error(message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
            <Input placeholder="ایمیل خود را وارد کنید" {...register("email")}/>
            {formState.errors.email && (
  <p>{formState.errors.email.message}</p>
)}
    <Input placeholder="رمز خود را وارد کنید" {...register("password")}/>
    {formState.errors.password && (
  <p>{formState.errors.password.message}</p>
)}
    
    <Button type="submit" disabled={formState.isSubmitting || !formState.isValid}>
        {formState.isSubmitting?"در حال ورود":"ورود"}
    </Button>
        </form>
  )
    }
  


export default LoginForm
