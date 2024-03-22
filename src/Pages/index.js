// public page
export { default as Login } from './login';
export { default as ForgotPassword } from './forgot-password'
export { default as ParentRegistrationForm } from './parentRegistrationForm'
export { default as RfidAttendance } from './rfidPage'
export { default as Logs } from './sys-admin/Logs'

// admin pages
export { default as SysDashboard } from './sys-admin/Dashboard'
export { default as ClassContent } from './sys-admin/Class'
export { default as Attendance } from './sys-admin/attendance/Attendance'
export { default as Announcement } from './sys-admin/Announcement/sys_announcement'
export { default as StudentAcc } from './sys-admin/accounts/StudentAcc'
export { default as ParentAcc } from './sys-admin/accounts/ParentAcc'
export { default as TeacherAcc } from './sys-admin/accounts/TeacherAcc'
export { default as AdminAcc } from './sys-admin/accounts/AdminAcc'

// student pages
export { default as StudentProfile } from './student/studentProfile'
export { default as ViewAttendance } from './student/viewAttendance'
export { default as AnnouncementPage } from './student/announcementPage'

//parent pages
export { default as ParentAnnouncementPage } from './parent/announcementPage'
export { default as ParentAttendanceViewPage } from './parent/attendanceView'

//teacher pages
export { default as AnnouncemenetTPage } from './teacher/announcemenetTPage'
export { default as TeacherInformation } from './teacher/teacherInformation'
export { default as StudentAtendanceViewing } from './teacher/studentAtendanceViewing'