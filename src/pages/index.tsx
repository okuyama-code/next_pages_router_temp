import React from 'react';
import { Box, Flex, Button, Text, useColorMode, useColorModeValue, IconButton, Menu, MenuButton, MenuList, MenuItem } from '@yamada-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Sun, Moon, Menu as MenuIcon, User } from 'lucide-react';

const Header = () => {
  const { data: session } = useSession();
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <div>
      {/* header */}
      <Box as="header" bg={bgColor} px={4} py={2} shadow="md">
        <Flex alignItems="center" justifyContent="space-between">
          <Link href="/" passHref>
            <Text fontSize="xl" fontWeight="bold" color={textColor}>
              個人開発
            </Text>
          </Link>

          <Flex alignItems="center">
            <IconButton
              icon={useColorModeValue(<Moon />, <Sun />)}
              onClick={toggleColorMode}
              variant="ghost"
              aria-label="Toggle color mode"
              mr={2}
            />

            {session ? (
              <Menu>
                <MenuButton as={Button} rightIcon={<User />}>
                  {session.user?.name || session.user?.email}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Flex>
                <Button onClick={() => signIn()} mr={2}>
                  Sign in
                </Button>
                <Link href="/register" passHref>
                  <Button colorScheme="primary">Register</Button>
                </Link>
              </Flex>
            )}

            <IconButton
              display={{ base: 'flex', md: 'none' }}
              icon={<MenuIcon />}
              variant="ghost"
              aria-label="Open menu"
              ml={2}
            />
          </Flex>
        </Flex>
      </Box>

      {session && (
        <>
          name:{session?.user?.name} <br />
          image:
          {session?.user?.image && (
            <img
              src={session.user.image}
              alt="icon"
              style={{ width: "100px", height: "100px" }}
            />
          )}
          <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}

    </div>
  );
};

export default Header;