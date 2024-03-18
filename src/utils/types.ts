export interface Event {
    title: string;
    student_id?: string;
    tutor_id: string;
    event_id: string;
    start_time: number;
    duration: number;
}

export interface Profile {
    bio?: string;
    educationLevel?: string;
    courses?: string[];
}
