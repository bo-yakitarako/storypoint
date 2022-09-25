import React, { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { getDatabase, ref, set } from 'firebase/database';
import { Button, Container } from '@chakra-ui/react';
import { planningUsersState, userIdState } from '../../modules/store';

const db = getDatabase();

const PerformButton: React.FC = () => {
  const userId = useRecoilValue(userIdState);
  const users = useRecoilValue(planningUsersState);
  const user = users.find((user) => user.userId === userId);
  if (user === undefined) {
    return null;
  }
  const { performer } = user;

  const onClick = useCallback(() => {
    set(ref(db, `users/${userId}/performer`), !performer);
  }, [performer, userId]);

  return (
    <Container textAlign="center" marginBottom="16px">
      <Button colorScheme="green" onClick={onClick} variant="outline">
        {!performer ? 'これやりたい！🙋‍♀️' : 'やっぱやめます🙇‍♀️'}
      </Button>
    </Container>
  );
};

export { PerformButton };
