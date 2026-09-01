"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormValues } from "../types/auth.types";
import { registerSchema } from "../schemas/RegisterSchema";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { registerAction } from "../services/RegisterAction";


function Registerform() {
    const {register,handleSubmit,reset,formState}=useForm<RegisterFormValues>({
        resolver:zodResolver(registerSchema)
    })

   async function onSubmit(formdata:RegisterFormValues) {
    const result = await registerAction(formdata);
    
   }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
<Input placeholder="نام خود را وارد کنید" {...register("name")}/>
<Input placeholder="ایمیل خود را وارد کنید" {...register("email")}/>
<Input placeholder="رمز خود را وارد کنید" {...register("password")}/>
<Button disabled={formState.isSubmitting || !formState.isValid}>
    {formState.isSubmitting?"در حال ثبت نام":"ثبت نام"}
</Button>
    </form>
  )
}

export default Registerform