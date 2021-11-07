import { Lesson } from "../model/lesson";
import { saveLessonsToFile } from "./saveLessonsToFile";

export async function updateLessons(lessons: Lesson[]) {
  try {
    await saveLessonsToFile(
      lessons.map((x) => {
        return {
          ...x,
          valid: true,
          updatedAt: new Date(),
        };
      })
    );
  } catch (error) {
    console.error(error);
  }
}
