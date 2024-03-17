import fs from "fs";

const EVENTS_CSV_FILE = "events.csv";

export function readEventsFromCSV() {
  return new Promise((resolve, reject) => {
    fs.readFile(EVENTS_CSV_FILE, "utf8", (err, data) => {
      if (err) {
        return reject(err);
      }

      const events = data.split("\n").map((line) => {
        const [title, tutor_id, event_id, start_time, duration, student_id] =
          line.split(",");
        return {
          title,
          tutor_id,
          event_id,
          start_time: parseInt(start_time),
          duration: parseInt(duration),
          student_id,
        };
      });

      resolve(events);
    });
  });
}

export function updateCSV(events) {
  return new Promise((resolve, reject) => {
    const csvData = events
      .map((event) => {
        return `${event.title},${event.tutor_id},${event.event_id},${
          event.start_time
        },${event.duration},${event.student_id || ""}`;
      })
      .join("\n");

    fs.writeFile(EVENTS_CSV_FILE, csvData, (err) => {
      if (err) {
        return reject(err);
      }
      console.log("Events CSV file updated successfully");
      resolve();
    });
  });
}
