
import {
      StudentAcc,
      ParentAcc,
      TeacherAcc,
      Attendance,
      Announcement,
      ClassContent,
      StudentProfile,
      ViewAttendance,
      TeacherInformation,
      StudentAtendanceViewing,
      SysDashboard,
      ParentAttendanceViewPage,
      AnnouncementPage,
      ParentAnnouncementPage,
      AnnouncemenetTPage,
      AdminAcc,
      Logs
  } from '../Pages';
  

export const protectedRoutesConfig = [

    { path: '', component: SysDashboard, allowedRoles: ['admin', 'superadmin'] },
    { path: 'class', component: ClassContent, allowedRoles: ['admin', 'superadmin'] },
    { path: 'attendance', component: Attendance, allowedRoles: ['admin', 'superadmin'] },
    { path: 'announcement', component: Announcement, allowedRoles: ['admin', 'superadmin'] },
    { path: 'studentAcc', component: StudentAcc, allowedRoles: ['admin', 'superadmin'] },
    { path: 'parentAcc', component: ParentAcc, allowedRoles: ['admin', 'superadmin'] },
    { path: 'teacherAcc', component: TeacherAcc, allowedRoles: ['admin', 'superadmin'] },
    { path: 'adminAcc', component: AdminAcc, allowedRoles: ['superadmin'] },
    { path: 'logs', component: Logs, allowedRoles: ['superadmin'] },

    { path: 'student', component: AnnouncementPage, allowedRoles: ['student'] },
    { path: 'student/Profile', component: StudentProfile, allowedRoles: ['student'] },
    { path: 'student/Attendance', component: ViewAttendance, allowedRoles: ['student'] },

    { path: 'teacher', component: AnnouncemenetTPage, allowedRoles: ['teacher'] },
    { path: 'teacher/attendance', component: StudentAtendanceViewing, allowedRoles: ['teacher'] },
    { path: 'teacher/Profile', component: TeacherInformation, allowedRoles: ['teacher'] },

    { path: 'parent', component: ParentAnnouncementPage, allowedRoles: ['parent'] },
    { path: 'parent/announcement', component: ParentAttendanceViewPage, allowedRoles: ['parent'] },
    { path: 'parent/viewAttendance', component: ParentAttendanceViewPage, allowedRoles: ['parent'] },
  ]; 

