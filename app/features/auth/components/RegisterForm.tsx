import { Container } from "@/components/layouts/Container"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormValues } from "../types/auth.types";
import { registerSchema } from "../schemas/RegisterSchema";


function Registerform() {
    const {register,handleSubmit,reset,formState}=useForm<RegisterFormValues>({
        resolver:zodResolver(registerSchema)
    })
  return (
<Container>
    <form>

    </form>
</Container>
    
  )
}

export default Registerform