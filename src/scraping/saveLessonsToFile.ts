import { promises as fs } from "fs";
import { Lesson } from "../model/lesson";

export async function saveLessonsToFile(lessons: Lesson[]) {
  await fs.writeFile("./lessons.json", JSON.stringify({ lessons }), "utf8");
}
