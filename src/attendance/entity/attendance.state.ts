export enum AttendanceState {
  PRESENT = 'PRESENT',
  LATE = 'LATE',
  ABSENT = 'ABSENT',
}

export function checkAttendanceState(date: Date): AttendanceState {
  const min = date.getMinutes();
  if (min >= 50 || min <= 10) {
    return AttendanceState.PRESENT;
  }
  if (min > 10 || min <= 20) {
    return AttendanceState.LATE;
  }
  return AttendanceState.ABSENT;
}
