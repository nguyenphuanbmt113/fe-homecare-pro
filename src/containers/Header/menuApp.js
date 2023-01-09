export const adminMenu = [
  {
    //hệ thống quan li nguoi dung
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-rd",
      },
      {
        name: "menu.admin.manage-doctor",
        link: "/system/manage-doctor",
      },
      {
        name: "menu.admin.manage-admin",
        link: "/system/user-admin",
      },
      {
        name: "menu.doctor.manage-schedule",
        link: "/doctorAdmin/manage-schedule",
      },
    ],
  },
  {
    //hệ thống quan li Phong Kham
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/manage-clinic",
      },
    ],
  },
  {
    //hệ thống quan li Chuyên Khoa
    name: "menu.admin.speciality",
    menus: [
      {
        name: "menu.admin.manage-speciality",
        link: "/system/manage-specialty",
      },
    ],
  },
  {
    //hệ thống quan li Handbook
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: "/system/manage-handbook",
      },
    ],
  },
];

//managesDoctor
export const doctorMenu = [
  {
    //Quanr LÝ khám bệnh của bác si
    name: "menu.doctor.manage-schedule",
    menus: [
      {
        name: "menu.doctor.manage-schedule",
        link: "/doctorAdmin/manage-schedule",
      },
      //quan ly benh nhan cua bac si
      {
        name: "menu.doctor.manage-patient",
        link: "/doctorAdmin/manage-patient",
      },
    ],
  },
];
