type ChatProps = {
    tutorNames: string[];
};

const Chat = ({ tutorNames }: ChatProps) => {
    return (
        <div className='bg-white p-8 rounded-3xl drop-shadow-2xl w-full h-full overflow-auto'>
            {tutorNames.map((tutor, index) => (
                <div key={index}>
                    <p className='text-2xl font-semibold mb-2'>{tutor}</p>
                </div>
            ))}
        </div>
    );
};

export default Chat;
