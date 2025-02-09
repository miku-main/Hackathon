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
                imageSrc: "/balance_sheet_icon.svg",
            },
            {
                id: 2,
                title: "EBITDA",
                imageSrc: "/EBITDA_icon.svg",
            },
            {
                id: 3,
                title: "Horizontal Analysis",
                imageSrc: "/horizontal_analysis_icon.svg",
            },
        ]);

        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1, // Balance Sheet Basics
                title: "Unit 1",
                description: "Learn the balance sheet basics",
                order: 1,
            },
            {
                id: 2,
                courseId: 2, // EBITDA
                title: "Unit 2",
                description: "Learn EBITDA",
                order: 2,
            },
            {
                id: 3,
                courseId: 3, // Horizontal Analysis
                title: "Unit 3",
                description: "Learn horizontal analysis",
                order: 3,
            },
        ]);

        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1, // Unit 1 (Learn the basics...)
                order: 1,
                title: "Titles",
            },
            {
                id: 2,
                unitId: 1, // Unit 1 (Learn the basics...)
                order: 2,
                title: "Titles 2",
            },
            {
                id: 3,
                unitId: 1, // Unit 1 (Learn the basics...)
                order: 3,
                title: "Titles 3",
            },
            {
                id: 4,
                unitId: 1, // Unit 1 (Learn the basics...)
                order: 4,
                title: "Titles 4",
            },
            {
                id: 5,
                unitId: 1, // Unit 1 (Learn the basics...)
                order: 5,
                title: "Titles 5",
            },
        ]);

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1, // Titles
                type: "SELECT",
                order: 1,
                question: 'What does a balance sheet show?',
            },
            {
                id: 2,
                lessonId: 1, // Titles
                type: "SELECT",
                order: 2,
                question: 'Which of the following is an asset?',
            },
            {
                id: 3,
                lessonId: 1, // Titles
                type: "SELECT",
                order: 3,
                question: 'The accounting equation is: ',
            },
            {
                id: 4,
                lessonId: 1, // Titles
                type: "SELECT",
                order: 4,
                question: 'Cash, accounts receivable, and inventory are examples of _____ on a balance sheet',
            },
            {
                id: 5,
                lessonId: 2, // Titles
                type: "SELECT",
                order: 1,
                question: 'What does a balance sheet show?',
            },
            {
                id: 6,
                lessonId: 2, // Titles
                type: "SELECT",
                order: 2,
                question: 'Which of the following is an asset?',
            },
            {
                id: 7,
                lessonId: 2, // Titles
                type: "SELECT",
                order: 3,
                question: 'The accounting equation is: ',
            },
            {
                id: 8,
                lessonId: 2, // Titles
                type: "SELECT",
                order: 4,
                question: 'Cash, accounts receivable, and inventory are examples of _____ on a balance sheet',
            },

        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 1,
                correct: false,
                text: "A company's expenses over time",
            },
            {
                challengeId: 1,
                correct: true,
                text: "A company's financial position at a specific point in time",
            },
            {
                challengeId: 1,
                correct: false,
                text: "The total sales of a company",
            },
            {
                challengeId: 1,
                correct: false,
                text: "The company's tax obligations",
            },
            {
                challengeId: 2,
                correct: false,
                text: "Accounts Payable",
            },
            {
                challengeId: 2,
                correct: false,
                text: "Retained Earnings",
            },
            {
                challengeId: 2,
                correct: true,
                text: "Cash",
            },
            {
                challengeId: 2,
                correct: false,
                text: "Revenue",
            },
            {
                challengeId: 3,
                correct: true,
                text: "Assets = Liability + Equity",
            },
            {
                challengeId: 3,
                correct: false,
                text: "Assets = Revenue - Expenses",
            },
            {
                challengeId: 3,
                correct: false,
                text: "Liabilities = Assets + Equaity",
            },
            {
                challengeId: 3,
                correct: false,
                text: "Profit = Revenue - Liabilities",
            },
            {
                challengeId: 4,
                correct: false,
                text: "A",
            },
            {
                challengeId: 4,
                correct: false,
                text: "B",
            },
            {
                challengeId: 4,
                correct: false,
                text: "C",
            },
            {
                challengeId: 4,
                correct: true,
                text: "assets",
            },
        ]);

        console.log("Seeding finished")
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the database");
    }
};

main();

