export interface Event {
    student_id?: string;
    tutor_id: string;
    event_id: string;
    day: number;
    start_time: string;
    duration: number;
}

export interface Profile {
    bio?: string;
    educationLevel?: string;
    courses?: string[];
}
