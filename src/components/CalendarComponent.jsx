import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {DefaultText, TextPt20} from './PageComponent';

// 화면 너비 90% 설정
const screenWidth = Dimensions.get('window').width;
const calendarWidth = screenWidth * 0.9;

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date()); // 오늘 날짜
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth()); // 현재 월
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear()); // 현재 연도
  const [selectedDate, setSelectedDate] = useState({
    year: currentYear,
    month: currentMonth,
    day: currentDate.getDate(),
  });

  // 일요일부터 시작하는 날짜 배열 계산
  const getDaysInMonth = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const firstDayOfWeek = firstDay.getDay(); // 0: 일요일, 6: 토요일
    const numberOfDays = lastDay.getDate(); // 해당 월의 마지막 날
    const days = []; // 해당 월의 날짜

    // 앞쪽 빈 공간 추가
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    // 날짜 추가
    for (let i = 1; i <= numberOfDays; i++) {
      days.push(i);
    }

    // 뒷쪽 빈 공간 추가
    const remainingDays = 7 - (days.length % 7);
    if (remainingDays !== 7) {
      for (let i = 0; i < remainingDays; i++) {
        days.push(null);
      }
    }

    return days;
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  // 요일 배열
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  // 월 변경 핸들러
  const changeMonth = direction => {
    let newMonth = currentMonth;
    let newYear = currentYear;

    if (direction === 'next') {
      if (currentMonth === 11) {
        newMonth = 0;
        newYear++;
      } else {
        newMonth++;
      }
    } else if (direction === 'prev') {
      if (currentMonth === 0) {
        newMonth = 11;
        newYear--;
      } else {
        newMonth--;
      }
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  // 날짜 선택 핸들러
  const handleSelectDate = day => {
    if (day) {
      setSelectedDate({year: currentYear, month: currentMonth, day});
    }
  };

  return (
    <View style={styles.container}>
      {/* 이전, 다음 월 버튼 */}
      <View style={styles.navigation}>
        <TouchableOpacity onPress={() => changeMonth('prev')}>
          <Text style={styles.navButton}>{'<'}</Text>
        </TouchableOpacity>
        <TextPt20>{`${currentYear}년 ${currentMonth + 1}월`}</TextPt20>
        <TouchableOpacity onPress={() => changeMonth('next')}>
          <Text style={styles.navButton}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* 요일 표시 */}
      <View style={styles.weekdays}>
        {weekdays.map((day, index) => (
          <DefaultText key={index} style={styles.weekday}>
            {day}
          </DefaultText>
        ))}
      </View>

      {/* 날짜 표시 */}
      <View style={styles.calendar}>
        {daysInMonth.map((day, index) => {
          const isSelected =
            selectedDate.year === currentYear &&
            selectedDate.month === currentMonth &&
            selectedDate.day === day;

          return (
            <TouchableOpacity
              key={index}
              style={[styles.dateCell, isSelected && styles.selectedDate]}
              onPress={() => handleSelectDate(day)}>
              {day && <DefaultText>{day}</DefaultText>}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  // 년, 월, 변경 버튼 부분
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  navButton: {
    fontSize: 40,
    fontWeight: 'bold',
    marginHorizontal: 25,
    color: 'skyblue',
  },
  // 요일 부분
  weekdays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: calendarWidth,
    marginBottom: 10,
  },
  weekday: {
    width: calendarWidth / 7,
    textAlign: 'center',
  },
  // 날짜 부분
  calendar: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: calendarWidth,
  },
  dateCell: {
    width: calendarWidth / 7,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // 선택된 날짜
  selectedDate: {
    borderRadius: 50,
    borderColor: 'skyblue',
    borderWidth: 4,
  },
});

export default Calendar;
