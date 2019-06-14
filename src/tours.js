const tours = [
  {
    title: 'Sidebar',
    steps: [
      {
        target: '#sidebar .local-toggle-sidebar',
        content: 'This is the sidebar. It can be toggled with this button.',
        params: {
          placement: 'bottom'
        }
      },
      {
        target: '#sidebar .controls',
        content: 'Add assignments or exams quickly here',
        params: {
          placement: 'right'
        }
      },
      {
        target: '#sidebar .panel-tabs .schedule',
        content:
          '<b>Today\'s Agenda</b> shows your classes and schedule study/work times for the day',
        params: {
          placement: 'right'
        }
      },
      {
        target: '#sidebar .panel-tabs .assessments',
        content:
          '<b>Pressing Coursework</b> shows the most important assignments and exams coming up',
        params: {
          placement: 'right'
        }
      },
      {
        target: '#sidebar .panel-tabs .courseList',
        content:
          '<b>Courses</b> allows easy access to your courses and extra info by clicking on them',
        params: {
          placement: 'right'
        }
      },
      {
        target: '#sidebar .panel-tabs .todos',
        content: '<b>Todos</b> allows you to save to-dos for yourself',
        params: {
          placement: 'right'
        }
      }
    ]
  },
  {
    title: 'Navbar',
    steps: [
      {
        target: '#top-navbar .home-link',
        content:
          'The Dashboard shows a weekly <b>Calendar</b> of your courses, upcoming coursework, and scheduled study/work time as well as an <b>Overview</b> that shows a timeline of your current day and the locations of your events.',
        params: {
          placement: 'bottom'
        }
      },
      {
        target: '#top-navbar .coursework-link',
        content:
          '<b>Coursework</b> is where you manage all of your assignments and exams. You can view upcoming work, browse past work, and see a monthly calendar of the entire semester.',
        params: {
          placement: 'bottom'
        }
      },
      {
        target: '#top-navbar .tools-link',
        content:
          '<b>Tools</b> contains a variety of useful tools such as a work/study timer, RPI quick links, and grade calculators!',
        params: {
          placement: 'bottom'
        }
      },
      {
        target: '#top-navbar .announcement-icon',
        content:
          '<b>Announcements</b> holds announcements from the administrators about site updates and issues.',
        params: {
          placement: 'bottom'
        }
      },
      {
        target: '#top-navbar .tours-icon',
        content:
          '<b>Tours</b> lists all the tours (such as this current one) you can take.',
        params: {
          placement: 'bottom'
        }
      },
      {
        target: '#top-navbar .user-dropdown',
        content:
          'Here you can edit your account, view statistics on your coursework, logout, etc.',
        params: {
          placement: 'bottom'
        }
      }
    ]
  },
  {
    title: 'Dashboard',
    route: { name: 'home' },
    steps: [
      {
        target: '#calendar-holder',
        content: '[ FILL ME OUT ]',
        params: {
          placement: 'top'
        }
      },
      {
        target: '#fullscreen-button',
        content: '[ FILL ME OUT ]'
      }
    ]
  }
];

export default tours;
// export default {
//   sidebar: ,
//   'upcoming-assignments': [
//     {
//       target: '#calendar-holder',
//       content: '[ FILL ME OUT ]',
//       params: {
//         placement: 'top'
//       }
//     },
//     {
//       target: '#fullscreen-button',
//       content: '[ FILL ME OUT ]'
//     }
//   ],
//   'upcoming-exams': []
// };
