export const saveState = (value, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(`${value}`, serializedState);
  } catch (err) {
    // console.error(err);
  }
};

export const loadState = (get) => {
  try {
    const serializedState = localStorage.getItem(`${get}`);
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (err) {
    return [];
  }
};
export const loadClientSecret = (get) => {
  try {
    const serializedState = localStorage.getItem(`${get}`);
    return serializedState;
  } catch (err) {
    return "";
  }
};
export const shippLoadState = (get) => {
  try {
    const serializedState = localStorage.getItem(`${get}`);
    return serializedState ? JSON.parse(serializedState) : null;
  } catch (err) {
    return null;
  }
};
// export const paymentMethod = (get) => {
//   try {
//     const serializedState = localStorage.getItem(`${get}`);
//     return serializedState ? JSON.parse(serializedState) : "";
//   } catch (err) {
//     return {};
//   }
// };
