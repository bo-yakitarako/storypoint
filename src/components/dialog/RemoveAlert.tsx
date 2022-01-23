import React, { useCallback, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { removeAlertOpenState, userIdState } from '../../modules/store';
import { setDB } from '../../modules/firebase';

const RemoveAlert: React.FC = () => {
  const [isOpen, setOpen] = useRecoilState(removeAlertOpenState);
  const userId = useRecoilValue(userIdState);
  const ref = useRef(null);
  const onClose = useCallback(() => setOpen(false), []);
  const finish = useCallback(() => {
    setDB(`users/${userId}`, null);
    onClose();
  }, [userId]);
  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={ref}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          抜けちゃうぞ？
        </AlertDialogHeader>
        <AlertDialogBody>
          貴様がここに来るにはまだ早かったようだな...
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button onClick={onClose}>俺はまだやれる！</Button>
          <Button colorScheme="red" ml={3} onClick={finish}>
            抜けます
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { RemoveAlert };
