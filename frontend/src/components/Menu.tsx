import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import ChangeAvatar from "../components/ChangeAvatar";
import { useLogoutMutation } from "../generated/graphql";

function MenuComp({ user }) {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [logout, { data }] = useLogoutMutation();

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
              logout();
            }}
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
      <ChangeAvatar onClose={onClose} isOpen={isOpen} />
    </>
  );
}

export default MenuComp;
