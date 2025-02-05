import styled from 'styled-components/native';

/* 화면을 SafeAreaView로 감싸고 중앙 정렬 */
export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

/* 좌우 정렬 */
export const CalendarContainer = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: white;
`;

/* 텍스트 스타일 */
export const DefaultText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const TextPt20 = styled(DefaultText)`
  font-size: 20px;
`;
