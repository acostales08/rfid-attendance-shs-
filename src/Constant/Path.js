    import { FaCalendarCheck, FaUserPlus, FaUsers   } from 'react-icons/fa'
    import { GrAnnounce } from "react-icons/gr";
    import { AiFillDashboard } from "react-icons/ai";
    import { MdManageAccounts } from "react-icons/md";
    import { MdSupervisorAccount } from "react-icons/md";
    import { FaUserCircle } from "react-icons/fa";
    import { SiGoogleclassroom } from "react-icons/si";
    import { FaGraduationCap } from "react-icons/fa";
    import { HiDocumentText } from "react-icons/hi2";

    export const SupAdminSidebarData  = [
        {
            id: 1,
            title: 'Dashboard',
            path: '/dashboard',
            img:<AiFillDashboard size={20} className=' mx-2'/>,
            subLinks: []
        },
        {
            id: 2,
            title: 'Class',
            path: '/dashboard/class',
            img:<FaGraduationCap size={20} className=' mx-2'/>,
            subLinks: []
        },
        {
            id: 3,
            title: 'Attendance',
            path: '/dashboard/attendance',
            img:<FaCalendarCheck size={20} className=' mx-2'/>,
            subLinks: []
        },
        {
            id: 4,
            title: 'Announcement',
            path: '/dashboard/announcement',
            img:<GrAnnounce size={20} className=' mx-2'/>,
            subLinks: []
        },
        {
            id: 5,
            title: 'Add Admin',
            path: '/dashboard/adminAcc',
            img:<FaUserPlus size={20} className=' mx-2'/>,
            subLinks: []
        },
        {
            id: 6,
            title: 'Logs',
            path: '/dashboard/logs',
            img:<HiDocumentText size={20} className=' mx-2'/>,
            subLinks: []
        },
        {
            id: 7,
            title: 'Manage Accounts',
            // path: '/',
            img:<MdManageAccounts  size={20} className=' mx-2'/>,
            subLinks: [
                {
                    id: 71,
                    title: 'Student Account',
                    path: '/dashboard/studentAcc',
                    img: <FaUsers size={20} className=' mx-2'/>
                },
                {
                    id: 72,
                    title: 'Parent Account',
                    path: '/dashboard/parentAcc',
                    img: <FaUserPlus size={20} className=' mx-2'/>
                },
                {
                    id: 73,
                    title: 'Teacher Account',
                    path: '/dashboard/teacherAcc',
                    img: <MdSupervisorAccount size={20} className=' mx-2'/>
                },
            ]
        },

    ]

    export const SidebarData = [
        {
            id: 1,
            title: 'Dashboard',
            path: '/dashboard',
            img:<AiFillDashboard size={20} className=' mx-2'/>,
            subLinks: []
        },
        {
            id: 2,
            title: 'Class',
            path: '/dashboard/class',
            img:<FaGraduationCap size={20} className=' mx-2'/>,
            subLinks: []
        },
        {
            id: 3,
            title: 'Attendance',
            path: '/dashboard/attendance',
            img:<FaCalendarCheck size={20} className=' mx-2'/>,
            subLinks: []
        },
        {
            id: 4,
            title: 'Announcement',
            path: '/dashboard/announcement',
            img:<GrAnnounce size={20} className=' mx-2'/>,
            subLinks: []
        },
        {
            id: 5,
            title: 'Manage Accounts',
            // path: '/',
            img:<MdManageAccounts  size={20} className=' mx-2'/>,
            subLinks: [
                {
                    id: 51,
                    title: 'Student Account',
                    path: '/dashboard/studentAcc',
                    img: <FaUsers size={20} className=' mx-2'/>
                },
                {
                    id: 52,
                    title: 'Parent Account',
                    path: '/dashboard/parentAcc',
                    img: <FaUserPlus size={20} className=' mx-2'/>
                },
                {
                    id: 53,
                    title: 'Teacher Account',
                    path: '/dashboard/teacherAcc',
                    img: <MdSupervisorAccount size={20} className=' mx-2'/>
                },
            ]
        },

    ]
    export const StudentSidebarData = [
        {
            id: 1,
            title: 'Annoucement',
            path: '/dashboard/student',
            img:<GrAnnounce size={20} className=' mx-2'/>,
            subLinks: []
        },
        {
            id: 2,
            title: 'Profile',
            path: '/dashboard/student/Profile',
            img:<FaUserCircle size={20} className=' mx-2'/>,
            subLinks: []
        },
        {
            id: 3,
            title: 'Attendance',
            path: '/dashboard/student/Attendance',
            img:<FaCalendarCheck size={20} className=' mx-2'/>,
            subLinks: []
        },

    ]

    export const ParentSidebarData = [
        {
            id: 1,
            title: 'Annoucement',
            path: '/dashboard/parent',
            img:<GrAnnounce size={20} className=' mx-2'/>,
            subLinks: []
        },
        {
            id: 2,
            title: 'Attendance',
            path: '/dashboard/parent/viewAttendance',
            img:<FaCalendarCheck size={20} className=' mx-2'/>,
            subLinks: []
        },

    ]

    export const TeacherSidebarData = [
         {
            id: 1,
            title: 'Annoucement',
            path: '/dashboard/teacher',
            img:<GrAnnounce size={20} className=' mx-2'/>,
            subLinks: []
        },       
        {
            id: 2,
            title: 'Attendance',
            path: '/dashboard/teacher/attendance',
            img:<FaCalendarCheck size={20} className=' mx-2'/>,
            subLinks: []
        },

        {
            id: 3,
            title: 'Profile',
            path: '/dashboard/teacher/Profile',
            img:<FaGraduationCap size={20} className=' mx-2'/>,
            subLinks: []
        },


    ]