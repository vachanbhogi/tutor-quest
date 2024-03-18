import Details from './details/Details';
import Availability from './availability/Availability';
import { Profile } from '../../utils/types';
import { useState } from 'react';

function TutorForm() {
    const [details, setDetails] = useState<Profile>();
    return (
        <div className='p-8 flex flex-col items-center justify-center bg-slate-50 rounded-lg shadow-lg h-full'>
            {details ? <Availability /> : <Details set={setDetails} />}
        </div>
    );
}

export default TutorForm;
