// Redux
import { resetMessage } from "../slices/photoSlice";

export const useresetcomponentmessage = (dispatch) => {
  return () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };
};