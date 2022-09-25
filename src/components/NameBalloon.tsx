import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { nameDialogOpenState, nameState } from '../modules/store';

const NameBalloon: React.FC = () => {
  const setNameDialogOpen = useSetRecoilState(nameDialogOpenState);
  const name = useRecoilValue(nameState);
  return (
    <Box
      position="fixed"
      bgColor="blue.500"
      color="white"
      padding="16px"
      bottom="32px"
      right="420px"
      borderRadius="8px"
      _after={{
        content: '""',
        position: 'absolute',
        width: 0,
        height: 0,
        left: '100%',
        top: '50%',
        marginTop: '-14px',
        border: 'solid transparent',
        borderWidth: '15px',
        borderLeftColor: 'blue.500',
      }}
    >
      {name !== null && `${name}くん`}やっほー
      {name !== null && (
        <Box mt="8px">
          <Button
            colorScheme="green"
            fontSize="sm"
            onClick={() => setNameDialogOpen(true)}
          >
            名前変更
          </Button>
        </Box>
      )}
    </Box>
  );
};

export { NameBalloon };
