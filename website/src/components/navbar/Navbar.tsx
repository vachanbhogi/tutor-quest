export default function Navbar() {
    const handleGoogleSignIn = () => {
        window.location.href = "http://localhost:3000/signup";
    };

    return (
        <nav className="bg-blue-500">
            <div className="w-screen px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex">
                        <div className="hidden md:block">
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
                            <button onClick={handleGoogleSignIn} className="text-white px-3 py-2 rounded-md text-sm font-medium">
                                Sign in with Google
                            </button>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button type="button" className="bg-blue-500 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <a href="/" className="text-white block px-3 py-2 rounded-md text-base font-medium">How it works</a>
                    <a href="/" className="text-white block px-3 py-2 rounded-md text-base font-medium">Find a Tutor</a>
                    <a href="/" className="text-white block px-3 py-2 rounded-md text-base font-medium">Become a Tutor</a>
                </div>
            </div>
        </nav>
    );
}
