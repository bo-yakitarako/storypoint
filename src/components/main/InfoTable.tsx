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
  Box,
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
      width="auto"
      maxWidth="none"
      minWidth="540px"
    >
      <Table variant="simple" overflowX="auto">
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
              <Td key={index} position="relative">
                {users[index].performer && (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    position="absolute"
                    width="40px"
                    height="40px"
                    fontSize="20px"
                    bgColor="blue.100"
                    borderRadius="50%"
                    left="16px"
                    bottom="-40px"
                    _before={{
                      content: '""',
                      position: 'absolute',
                      top: '-16px',
                      border: '8px solid transparent',
                      borderBottom: '16px solid blue',
                      borderBottomColor: 'blue.100',
                    }}
                  >
                    🙋‍♀️
                  </Box>
                )}
                {point}
              </Td>
            ))}
          </Tr>
        </Tbody>
      </Table>
    </Container>
  );
};

export { InfoTable };
