import { Box, Button, useNotice } from '@yamada-ui/react'
import { Bird } from "@yamada-ui/lucide"

import React from 'react'

const login = () => {
  const successNotice = useNotice({
    component: ({ description }) => (
      <Box color="white" py={3} px={4} bg="green.400" rounded="md" display="flex" alignItems="center">
        <Bird color="black" mr={2}/> 
        {description}
      </Box>
    ),
    duration: 1500,
    status: "success",
    variant: "subtle",
  });

  const handleSubmit = () => {
    console.log("handleSubmit!!")
    successNotice({ description: "ログインしました" })
  }

  return (
    <Button onClick={handleSubmit}>
    ログインする
  </Button>
  )
}

export default login