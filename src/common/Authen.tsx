const getData = JSON.parse(localStorage.getItem("user") || '{}');
export const jwt = getData.jwt;
export const userId = getData.id