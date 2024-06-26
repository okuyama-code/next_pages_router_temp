import { Box, Button, useNotice } from '@yamada-ui/react'
import React from 'react'

const login = () => {
  const succuesNotice = useNotice({
    component: ({ description }) => (
      <Box color="white" py={3} px={4} bg="green.400" rounded="md">
        {description}
      </Box>
    ),
    duration: 1500,
    status: "success",
    variant: "subtle",
  })

  const handleSubmit = () => {
    console.log("handleSubmit!!")
    succuesNotice({ description: "ログインしました" })
  }

  return (
    <Button onClick={handleSubmit}>
    ログインする
  </Button>
  )
}

export default login