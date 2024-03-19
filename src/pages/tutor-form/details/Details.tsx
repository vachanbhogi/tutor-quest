import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { setDoc, doc } from '@firebase/firestore';
import { firestore } from '../../../firebase/firebase';

type DetailsProps = {
    set: (data: number) => void;
};

function Details({ set }: DetailsProps) {
    const user = useAuth();
    const [bio, setBio] = useState('');
    const [courseInput, setCourseInput] = useState('');
    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
    const [educationLevel, setEducationLevel] = useState('');
    const courseOptions = [
        'Algebra 1',
        'Algebra 2',
        'Geometry',
        'Trigonometry',
        'Pre-calculus',
        'Biology',
        'Chemistry',
        'Physics',
    ];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!bio || selectedCourses.length === 0 || !educationLevel) {
          alert('Please fill in all fields');
          return;
      }
      const tutor = {
          bio: bio,
          courses: selectedCourses,
          educationLevel: educationLevel,
          user: {
              displayName: user.currentUser?.displayName, // Access the display name from currentUser
              photoURL: user.currentUser?.photoURL,
          }
      };
      try {
          const docRef = doc(firestore, 'tutors', user.currentUser!.uid); // Access the UID from currentUser
          await setDoc(docRef, tutor);
          set(1);
      } catch (error) {
          console.error('Error adding session to Firestore:', error);
      }
  };
  

    const handleAddCourse = () => {
        if (courseInput.trim() && !selectedCourses.includes(courseInput)) {
            setSelectedCourses([...selectedCourses, courseInput]);
            setCourseInput('');
        }
    };

    const handleRemoveCourse = (course: string) => {
        setSelectedCourses(selectedCourses.filter((c) => c !== course));
    };

    return (
        <>
            <h1 className='text-4xl font-bold mb-8'>Apply to be a Tutor</h1>
            <div className='bg-white p-8 rounded-3xl drop-shadow-2xl w-1/2'>
                <div className='flex items-center justify-between mb-4 text-center'>
                    <p className='text-4xl font-semibold mb-2'>
                        {user.currentUser!.displayName}
                    </p>
                    <img
                        src={user.currentUser!.photoURL!}
                        className='w-12 h-12 rounded-full'
                        alt='User Avatar'
                    />
                </div>
                <form onSubmit={handleSubmit} className='w-full'>
                    {' '}
                    {/* Fix: Added onSubmit attribute */}
                    <div className='mb-6'>
                        <label
                            htmlFor='courses'
                            className='block text-sm font-medium text-gray-600 mb-2'
                        >
                            Courses
                        </label>
                        <div className='flex flex-wrap gap-2 mb-2'>
                            {selectedCourses.map((course) => (
                                <div
                                    key={course}
                                    className='bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center'
                                >
                                    {course}
                                    <button
                                        type='button'
                                        className='ml-2 focus:outline-none'
                                        onClick={() =>
                                            handleRemoveCourse(course)
                                        }
                                    >
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            className='h-4 w-4 text-red-500'
                                            viewBox='0 0 20 20'
                                            fill='currentColor'
                                        >
                                            <path
                                                fillRule='evenodd'
                                                d='M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z'
                                                clipRule='evenodd'
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className='flex items-center'>
                            <select
                                className='w-full py-2 px-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                value={courseInput}
                                onChange={(e) => setCourseInput(e.target.value)}
                            >
                                <option value='' disabled>
                                    Select a course...
                                </option>
                                {courseOptions.map((course) => (
                                    <option key={course} value={course}>
                                        {course}
                                    </option>
                                ))}
                            </select>
                            <button
                                type='button'
                                className='ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                onClick={handleAddCourse}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                    <div className='mb-6'>
                        <label
                            htmlFor='educationLevel'
                            className='block text-sm font-medium text-gray-600 mb-2'
                        >
                            Highest Education Level
                        </label>
                        <select
                            id='educationLevel'
                            className='w-full py-2 px-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            value={educationLevel}
                            onChange={(e) => setEducationLevel(e.target.value)}
                            required
                        >
                            <option value='' disabled>
                                Select
                            </option>
                            <option value='Middle School'>Middle School</option>
                            <option value='High School'>High School</option>
                            <option value='College'>College</option>
                        </select>
                    </div>
                    <div className='mb-6'>
                        <label
                            htmlFor='bio'
                            className='block text-sm font-medium text-gray-600 mb-2'
                        >
                            Bio
                        </label>
                        <textarea
                            id='bio'
                            rows={4}
                            className='w-full py-2 px-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}

export default Details;
