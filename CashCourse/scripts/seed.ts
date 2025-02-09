import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding database");

        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Balance Sheet Basics",
                imageSrc: "/mascot.svg",
            },
            {
                id: 2,
                title: "EBITDA",
                imageSrc: "/mascot.svg",
            },
            {
                id: 3,
                title: "Horizontal Analysis",
                imageSrc: "/mascot.svg",
            },
        ]);

        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1, // Balance Sheet Basics
                title: "Unit 1",
                description: "Learn the balance sheet basics",
                order: 1,
            }
        ]);

        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1, // Unit 1 (Learn the basics...)
                order: 1,
                title: "Titles",
            },
        ]);

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1, // Titles
                type: "SELECT",
                order: 1,
                question: 'This is a question?',
            },
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                id: 1,
                challengeId: 1, // This is a question?
                imageSrc: "/mascot.svg",
                correct: true,
                text: "test",
            },
            {
                id: 2,
                challengeId: 1,
                imageSrc: "/coin_icon.svg",
                correct: false,
                text: "test 2",
            },
            {
                id: 3,
                challengeId: 1,
                imageSrc: "/quest_icon.svg",
                correct: false,
                text: "test 3",
            },
        ]);

        console.log("Seeding finished")
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the database");
    }
};

main();

