import {
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SettingsIcon } from '@chakra-ui/icons';
import ChangeAvatar from '../components/ChangeAvatar';
import { useLogoutMutation } from '../generated/graphql';

function MenuComp({ user, avatar }) {
    const router = useRouter();
    const { onOpen, isOpen, onClose } = useDisclosure();
    const [logout] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logout();
            await router.push('/login');
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };

    return (
        <>
            <Menu>
                <MenuButton>
                    {user ? user : null}
                    <SettingsIcon />
                </MenuButton>
                <MenuList>
                    <Link href={`/user/${user}/1`} passHref>
                        <MenuItem as="a">Your Activity</MenuItem>
                    </Link>
                    <MenuItem onClick={onOpen}>Change Avatar</MenuItem>
                    <MenuItem
                        onClick={async () => {
                            await handleLogout();
                        }}
                    >
                        Logout
                    </MenuItem>
                </MenuList>
            </Menu>
            <ChangeAvatar
                avatar={avatar}
                isOpen={isOpen}
                onClose={onClose}
                user={user}
            />
        </>
    );
}

export default MenuComp;
