import { Box, Button, FormControl, useNotice,  Input } from '@yamada-ui/react'
import { Bird } from '@yamada-ui/lucide'

import React from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { useSession, signIn, signOut } from "next-auth/react"


const Login = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )

  const {
    handleSubmit,
    control
  } = useForm({
    defaultValues: {
      name: ''
    }
  })

  const successNotice = useNotice({
    component: ({ description }) => (
      <Box
        color="white"
        py={3}
        px={4}
        bg="green.400"
        rounded="md"
        display="flex"
        alignItems="center"
      >
        <Bird color="black" mr={2} />
        {description}
      </Box>
    ),
    duration: 1500,
    limit: 3,
  })

  const onSubmit = (data: FieldValues): void => {
    console.log(data)
    console.log(process.env.NEXT_PUBLIC_API_BASE)
    successNotice({ description: 'ログインしました' })
  }



  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className=''>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState: { error } }): JSX.Element => (
            <FormControl
              label="お名前"
            >
              <Input
                type="text"
                placeholder="山田 太郎"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            </FormControl>
          )}
        />
        <Button type="submit" mt={4}>
          ログインする
        </Button>


      </form>
    </>
  )
}

export default Login
