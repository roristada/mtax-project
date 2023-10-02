'use client'
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useRouter } from "next/navigation";

interface User {
    id: number;
    email: string;
    role: string;
}


function Profile() {
    const route = useRouter()
    const [user, setUser] = useState<User | null>(null);
    

    useEffect(() => {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
        if (token) {
            const decodedToken = jwt_decode(token) as User;
            setUser(decodedToken);
        }
    }, []);

    const handleLogout = () => {
        // Clear the token by setting its expiration to the past
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        setUser(null); // Reset the user state to null after logout
        route.push('/')
    };

    if (user) {
        if (user.role === 'admin') {
            return (
                <div>
                    <div>Welcome Admin : {user.email}!</div>
                    <button onClick={handleLogout}>Logout</button>
                    
                </div>
            );
            
            
        } else {
            return (
                <div>
                    <div>Welcome user: {user.email}!</div>
                    <button onClick={handleLogout}>Logout</button>
                    {/* Render other authenticated user content */}
                </div>
            );
            // Render user components or redirect to user-specific pages
        }
    } else {
        return <div>Please login to access the content.</div>;
        // Render login form or redirect to login page
    }
}

export default Profile;
