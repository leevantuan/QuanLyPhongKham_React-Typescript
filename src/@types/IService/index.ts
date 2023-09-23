export interface ServiceInterface {
  key: string;
  serviceName: string;
  price: string;
  status: boolean;
  roomId: string;
}
export interface AddServiceInterface {
  serviceName: string;
  price: string;
  status: string;
  roomId: string;
}

//model
export interface UpdateServiceModelInterface {
  HandleClickCancelUpdateService: () => void;
  HandleClickOkUpdateService: (
    serviceId: string,
    serviceName: string,
    price: string,
    status: string,
    roomId: string,
  ) => void;
  id: string;
}

export interface ListServiceModelInterface {
  reset: boolean;
  HandleClickAddService: () => void;
  HandleClickDescriptionService: (id: string) => void;
  HandleClickUpdateService: (id: string) => void;
}

export interface AddServiceModelInterface {
  HandleClickCancelAddService: () => void;
  HandleClickOkAddService: (
    serviceName: string,
    price: string,
    status: string,
    roomId: string,
  ) => void;
}
