import Details from './details/Details';
import Availability from './availability/Availability';
import { useState } from 'react';

function TutorForm() {
    const [secondStage, setSecondStage] = useState<number>(0);
    return (
        <div className='p-8 flex flex-col items-center justify-center bg-slate-50 rounded-lg shadow-lg h-full'>
            {secondStage > 0 ? <Availability /> : <Details set={setSecondStage} />}
        </div>
    );
}

export default TutorForm;
