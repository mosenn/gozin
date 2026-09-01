import { Container } from "@/components/layouts/Container"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormValues } from "../types/auth.types";
import { registerSchema } from "../schemas/RegisterSchema";
import { Input } from "@/components/ui/Input";


function Registerform() {
    const {register,handleSubmit,reset,formState}=useForm<RegisterFormValues>({
        resolver:zodResolver(registerSchema)
    })

   async function onSubmit(formdata:RegisterFormValues) {
    
   }
  return (
<Container>
    <form onSubmit={handleSubmit(onSubmit)}>
<Input placeholder="نام خود را وارد کنید" {...register("name")}/>
<Input placeholder="ایمیل خود را وارد کنید" {...register("email")}/>
<Input placeholder="رمز خود را وارد کنید" {...register("password")}/>
    </form>
</Container>
    
  )
}

export default Registerform