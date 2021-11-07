import { promises as fs } from "fs";
import { Lesson } from "../model/lesson";
import { Scrap } from "../model/scrap";

export async function readLessonsFromFile(): Promise<Lesson[]> {
  try {
    const res = await fs.readFile("./lessons.json", { encoding: "utf8" });
    const data: Scrap = JSON.parse(res);
    return data.lessons;
  } catch (error) {
    console.error(error);
  }
}
