export interface DoctorsInterface {
  key: string;
  doctorName: string;
  phoneNumber: string;
  address: string;
  birthDay: string;
  dateWork: string;
  professtional: string;
  status: boolean;
  roomId: string;
}
export interface AddDoctorsInterface {
  doctorName: string;
  phoneNumber: string;
  address: string;
  birthDay: string;
  dateWork: string;
  professtional: string;
  status: boolean;
  roomId: string;
}

//model
export interface UpdateDoctorModelInterface {
  id: string;
  HandleClickCancelUpdateDoctor: () => void;
  HandleClickOkUpdateDoctor: () => void;
}
export interface AddDoctorModelInterface {
  HandleClickCancelAddDoctor: () => void;
  HandleClickOkAddDoctor: () => void;
}
