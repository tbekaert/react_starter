const utf8_to_b64 = (str) => window.btoa(unescape(encodeURIComponent( str )));
const b64_to_utf8 = (str) => decodeURIComponent(escape(window.atob( str )));

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    return serializedState ? JSON.parse(b64_to_utf8(serializedState)) : undefined;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try{
    const serializedState = utf8_to_b64(JSON.stringify(state));
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // Error
  }
};
