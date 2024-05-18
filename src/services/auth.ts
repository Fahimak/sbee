export const STORAGE_USER_ID_KEY = "sessionUserId";

export const getUserId = (): string => {
  if (global.localStorage) {
    const localId = localStorage.getItem(STORAGE_USER_ID_KEY);
    if (localId) {
      return localId;
    }

    const newUserId = crypto
      ? crypto.randomUUID()
      : `${(new Date().getTime() * Math.random()).toString(16)}${(
          Math.random() * 99
        ).toString(16)}`;

    localStorage.setItem(STORAGE_USER_ID_KEY, newUserId);
    return newUserId;
  }
  return "";
};
