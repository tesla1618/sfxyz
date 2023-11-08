import { useState } from "react";

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState();
  return { currentUser, setCurrentUser };
};
