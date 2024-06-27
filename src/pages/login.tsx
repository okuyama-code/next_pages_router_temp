import { Box, Button, FormControl, useNotice,  Input } from '@yamada-ui/react'
import { Bird } from '@yamada-ui/lucide'

import React from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form'

const Login = () => {
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
