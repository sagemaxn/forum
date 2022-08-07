import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {useRouter} from 'next/router'
import { SettingsIcon } from "@chakra-ui/icons";
import ChangeAvatar from "../components/ChangeAvatar";
import { useLogoutMutation } from "../generated/graphql";

function MenuComp({ user, avatar }) {
  const router = useRouter()
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [logout, { data }] = useLogoutMutation();

  const logoutF = () => {
    logout()
    router.push('/login')
  }

  return (
    <>
      <Menu>
        <MenuButton as={Text}>
          {user ? user : null}
          <SettingsIcon />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={onOpen}>Change Avatar</MenuItem>
          <MenuItem
            onClick={async () => {
              logoutF()
            }}
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
      <ChangeAvatar onClose={onClose} isOpen={isOpen} avatar={avatar} user={user}/>
    </>
  );
}

export default MenuComp;
