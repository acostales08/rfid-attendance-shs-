import { z } from 'zod'


const requiredString = (message = "required") => {
   return z.string({required_error: message}).min(1, {message});    
}

export default requiredString