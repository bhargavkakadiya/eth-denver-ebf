// contexts/UserContext.js
import { createContext, useState } from "react";

interface UserContextValue {
    user: null;
    setUser: React.Dispatch<React.SetStateAction<null>>;
}

const UserContext = createContext<UserContextValue | null>(null);

export const UserProvider = ({ children }: { children: any }) => {
    const [user, setUser] = useState<null>(null); // Example state that you might want to share

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export default UserContext;
