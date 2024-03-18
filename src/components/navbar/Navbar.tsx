import { useAuth } from "../../context/AuthContext";
import { doSignInWithGoogle, doSignOut } from "../../firebase/auth";

export default function Navbar() {
    const user = useAuth().currentUser;
    
    const handleAuthChange = async () => {
        try {
            if (!user) await doSignInWithGoogle();
            if (user) await doSignOut();
            console.log(user)
        } catch(err) {
            console.error(err);
        }
    };

    return (
        <nav className="bg-blue-500">
            <div className="w-screen px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex">
                        <div>
                            <div className="flex items-baseline space-x-4">
                                <a href="/" className="text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                                <a href="/about" className="text-white px-3 py-2 rounded-md text-sm font-medium">How it works</a>
                                <a href="/find-a-tutor" className="text-white px-3 py-2 rounded-md text-sm font-medium">Find a Tutor</a>
                                <a href="/become-a-tutor" className="text-white px-3 py-2 rounded-md text-sm font-medium">Become a Tutor</a>
                                <a href="/dashboard" className="text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex">
                        <div className="relative">
                            <button onClick={handleAuthChange} className="text-white px-3 py-2 rounded-md text-sm font-medium">
                                {user ? 'Sign Out' : 'Sign In'}
                            </button>
                        </div>
                    </div>            
                </div>
            </div>
        </nav>
    );
}
