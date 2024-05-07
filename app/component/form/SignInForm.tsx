"use client"

import React from 'react'
import {z} from 'zod'
import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import {signIn} from 'next-auth/react'



const SignInForm = () => {

    const formSchema = z.object({
      
        email: z
            .string()
            .min(1, { message: "This field has to be filled." })
            .email("This is not a valid email."),
        password: z.string()
      })

      const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
           
            password: '',
            email: ''  
        }
      })
      const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data)
        const signInData = await signIn('')
      }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div>Email</div>
        <div className='relative h-[40px]'>
            <input placeholder='email' defaultValue="test" {...register("email")} className="bg-slate-500/60 text-neutral-400" />
            {errors.email && <span className='text-red-600 text-[14px] absolute  top-5 left-0'>{`${errors && errors.email.message}`}</span>}   
        </div>
        <div>Password</div>
        <div className='relative h-[40px]'>
            <input placeholder='password' type='password' {...register("password")} className="bg-slate-500/60 text-neutral-400" />
            {errors.password && <span className='text-red-600 text-[14px] absolute  top-5 left-0'>{`${errors && errors.password.message}`}</span>}   
        </div>
      
      <input type="submit" />
    </form>
  )
}

export default SignInForm