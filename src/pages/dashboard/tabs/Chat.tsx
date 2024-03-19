type ChatProps = {
    tutorNames: string[];
};

const Chat = ({ tutorNames }: ChatProps) => {
    return (
        <div className='bg-white p-8 rounded-3xl drop-shadow-2xl w-full h-full overflow-auto'>
            <h2 className='text-xl font-semibold mb-4 pb-4 w-full border-b-2'>
                Chat
            </h2>

            {tutorNames.map((tutor, index) => (
                <div key={index}>
                    <p className='text-2xl font-semibold mb-2'>{tutor}</p>
                </div>
            ))}
        </div>
    );
};

export default Chat;
