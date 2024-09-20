
export const saveAuthInfo = (sessionId: string, accountId: string) => {
    localStorage.setItem('sessionId', sessionId);
    localStorage.setItem('accountId', accountId);
  };
  
  export const getAuthInfo = () => {
    return {
      sessionId: localStorage.getItem('sessionId'),
      accountId: localStorage.getItem('accountId'),
    };
  };
  
  export const clearAuthInfo = () => {
    localStorage.removeItem('sessionId');
    localStorage.removeItem('accountId');
  };
  
  export const isLoggedIn = () => {
    const { sessionId, accountId } = getAuthInfo();
    return !!sessionId && !!accountId;
  };