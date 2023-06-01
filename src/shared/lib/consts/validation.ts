export const nameRegex = /^[A-ZА-Я-?]+[a-zа-яA-ZА-Я-?]*[a-zа-яA-ZА-Я]$/g;
export const nameMinLength = 2;
export const nameMaxLength = 30;

export const loginRegex = /^[A-Za-z-_0-9]+[A-Za-z][-_0-9]*$/g;
export const loginMinLength = 3;
export const loginMaxLength = 20;

export const emailRegex = /^(\w+)([.!?/+-=*`~&^()[\]|\\,:;'"]?)(\w+[.!?/+-=*`~&^()[\]|\\,:;'"]?\w+)(@)([a-z]{2,})(\.)([a-z]{2,})$/g;
export const emailMinLength = 7;
export const emailMaxLength = 30;

export const passwordRegex = /^(?=.*[A-Za-z_=-?!@#$%^&*()|/.,:;"'`~])(?=.*[A-Za-z_=-?!@#$%^&*()|/.,:;"'`~])(?=.*\d)[a-zA-Z\d_=-?!@#$%^&*()|/.,:;"'`~]{8,}$/gm;
export const passwordMinLength = 8;
export const passwordMaxLength = 40;

export const phoneRegex = /^(\+)?\d{10,15}$/gm;
export const phoneMinLength = 10;
export const phoneMaxLength = 15;
