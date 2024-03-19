export interface Event {
    student_id?: string;
    tutor_id: string;
    event_id: string;
    day: number;
    start_time: string;
    duration: number;
}

export interface Profile {
    id: string;
    bio?: string;
    educationLevel?: string;
    courses?: string[];
    user: {
        displayName?: string;
        photoURL?: string;
        uid?: string;
    }
}
