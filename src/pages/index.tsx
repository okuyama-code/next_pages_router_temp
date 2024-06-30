import React, { useEffect, useState } from 'react';
import { Box, Flex, Button, Text, useColorMode, useColorModeValue, IconButton, Menu, MenuButton, MenuList, MenuItem } from '@yamada-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Sun, Moon, Menu as MenuIcon } from 'lucide-react';
import { getCurrentUser, getUsers } from './api/user';
import { useAtom } from 'jotai';
import { currentUserState, usersState } from '@/atoms/users-state';

const Header = () => {
  const { data: session } = useSession();
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  const [fetchUsers, setFetchUsers] = useAtom(usersState)
  const [fetchCurrentUser, setFetchCurrentUser] = useAtom(currentUserState)

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await getUsers();
        setFetchUsers(res.data.users);
      } catch (e) {
        console.error('Failed to fetch users:', e);
        setError('Failed to fetch users');
      }
    }

    async function fetchCurrentUser(email: string) {
      try {
        const params = { email };
        const res = await getCurrentUser(params);
        setFetchCurrentUser(res.data.user);
      } catch (e) {
        setError('Failed to fetch current user');
      }
    }

    setLoading(true);
    setError(null);

    fetchUsers();

    if (session?.user?.email) {
      fetchCurrentUser(session.user.email);
    }

    setLoading(false);
  }, [session]);

  // console.log(fetchUsers)
  console.log(fetchCurrentUser)
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
                <MenuButton as={Button}>
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
          email: {session?.user?.email} <br />
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