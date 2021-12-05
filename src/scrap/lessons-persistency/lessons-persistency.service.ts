import { Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { promises as fs } from "fs";
import { Lesson } from "../../model/lesson";
import { Scrap } from "../../model/scrap";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class LessonsPersistencyService {
  private path: string;
  constructor(
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger
  ) {
    this.logger.info(`LessonsPersistencyService constructor`);
    this.path = this.configService.get("scrap.filepath", { infer: true });
  }

  public async readLessonsFromFile(): Promise<Lesson[]> {
    try {
      const res = await fs.readFile(this.path, {
        encoding: "utf8",
      });
      const data: Scrap = JSON.parse(res);
      this.logger.info(
        `read ${data.lessons.length} lessons file from ${this.path}`
      );
      return data.lessons;
    } catch (error) {
      this.logger.error(
        `could not read lessons file from ${this.path} ${error}`
      );
    }
  }

  public async saveLessonsToFile(lessons: Lesson[]) {
    try {
      await fs.writeFile(this.path, JSON.stringify({ lessons }), "utf8");
      this.logger.info(`saved lessons file to ${this.path}`);
    } catch (error) {
      this.logger.error(`could not save lessons file to ${this.path} ${error}`);
    }
  }

  public async updateLessons(lessons: Lesson[]) {
    try {
      const updatedLessons = lessons.map((x) => {
        return {
          ...x,
          valid: true,
          updatedAt: new Date(),
        };
      });
      this.logger.info(`updated lessons file`);
      await this.saveLessonsToFile(updatedLessons);
    } catch (error) {
      this.logger.info(`could not update lessons file ${error}`);
    }
  }
}
