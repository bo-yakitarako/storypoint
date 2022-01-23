import React from 'react';
import {
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { planningUsersState, userIdState } from '../../modules/store';

const InfoTable: React.FC = () => {
  const userId = useRecoilValue(userIdState);
  const users = useRecoilValue(planningUsersState);
  const userIndex = users.findIndex((user) => user.userId === userId);
  const names = users.map((user) => user.name);
  const points = users.map((user) => user.storyPoint);
  const canDisplay = points.every((point) => point !== '-');
  const displayPoints = points.map((point) => {
    if (point === '-') {
      return '-';
    }
    return canDisplay ? point : '🙆‍♂️';
  });
  return (
    <Container
      padding={3}
      borderColor="gray.200"
      borderWidth={1}
      borderRadius="12px"
      backgroundColor="white"
    >
      <Table variant="simple" maxWidth="640px" overflowX="auto">
        <TableCaption>全員設定し終わったら表示されるよ</TableCaption>
        <Thead>
          <Tr>
            {names.map((name, index) => (
              <Th
                key={name}
                color={index === userIndex ? 'green.400' : undefined}
              >
                {name}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            {displayPoints.map((point, index) => (
              <Td key={index}>{point}</Td>
            ))}
          </Tr>
        </Tbody>
      </Table>
    </Container>
  );
};

export { InfoTable };
